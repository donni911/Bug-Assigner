import MockAdapter from "axios-mock-adapter";
import { loadBugs, addBug, resolveBug, getUnresolvedBugs } from "../bugs";
import configureStore from "../configureStore";
import axios from "axios";

describe("bugSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;

  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  it("should add bug to the store if it's saved to the server", async () => {
    // Arrange
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add bug to the store if it's not saved to the server", async () => {
    // Arrange
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    // Act
    await store.dispatch(addBug(bug));

    // Assert
    expect(bugsSlice().list).toHaveLength(0);
  });

  it("should mark bug as a resolved if it save to the server", async () => {
    fakeAxios
      .onPatch("/bugs/1")
      .reply(200, { resolved: true, description: "a", id: 1 });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    // Act
    await store.dispatch(
      addBug({
        description: "b",
      })
    );
    await store.dispatch(resolveBug(1));

    // Assert
    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark bug as a resolved if it not save to the server", async () => {
    fakeAxios.onPatch("/bugs/1").reply(500);
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    // Act
    await store.dispatch(
      addBug({
        description: "b",
      })
    );
    await store.dispatch(resolveBug(1));

    // Assert
    expect(bugsSlice().list[0].resolved).not.toBe(true);
  });

  describe("selectors", () => {
    it("get unresolved bugs selector", async () => {
      const state = createState();
      state.entities.bugs.list = [
        { resolved: true, id: 1 },
        { id: 2 },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("the should come from the cache", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if the bugs dont exist in the cache", () => {
      it("they should be fetched from the server and put it in store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });

      describe("loading indicator", () => {
        it("should be true while fetching the bugs", async () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return 200, [{ id: 1 }];
          });

          store.dispatch(loadBugs());
        });

        it("should be false after the bugs are fetched", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });

        it("should be false if the server returns an error", async () => {
          fakeAxios.onGet("/bugs").reply(500);

          await store.dispatch(loadBugs());

          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });
});

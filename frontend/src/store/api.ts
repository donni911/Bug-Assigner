import { createAction } from "@reduxjs/toolkit";
import { Project } from "../types/Project";
import { Bug } from "../types/Bug";

export type BeganPayload = {
    type?: string,
    url: string,
    method?: string,
    data?: object,
    onStart?: string,
    onSuccess?: string,
    onError?: string,
}

export type CallSuccessPayload = {
    status: string,
    data: Array<Bug | Project>
}

export type CallFailedPayload = string


export const apiCallBegan = createAction<BeganPayload>("api/callBegan");
export const apiCallSuccess = createAction<CallSuccessPayload>("api/callSuccess");
export const apiCallFailed = createAction<CallFailedPayload>("api/callFailed");

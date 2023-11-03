import { Card, Skeleton, HStack } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card borderRadius={"sm"} minHeight={"250px"}>
      <HStack p={4}>
        <Skeleton height="25px" width="40px" />
        <Skeleton height="25px" width="40px" />
        <Skeleton height="25px" width="40px" />
      </HStack>
      <HStack px={4}>
        <Skeleton width={"150px"} height="30px" />
      </HStack>
      <HStack p={4}>
        <Skeleton height="15px" width="30px" />
        <Skeleton height="15px" width="30px" />
        <Skeleton height="15px" width="30px" />
      </HStack>
      <HStack px={4}>
        <Skeleton height="40px" width="100%" />
      </HStack>
      <HStack
        mt={"auto"}
        p={4}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Skeleton height="20px" width="80px" />
        <Skeleton height="20px" width="20px" />
      </HStack>
    </Card>
  );
};

export default GameCardSkeleton;

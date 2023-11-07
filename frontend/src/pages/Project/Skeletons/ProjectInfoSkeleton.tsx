import { Card, HStack, Skeleton } from "@chakra-ui/react";

const ProjectInfoSkeleton = () => {
  return (
    <Card p={4} borderRadius={"sm"} minHeight={"250px"}>
      <HStack justifyContent={"space-between"}>
        <Skeleton width={"150px"} height="30px" />
        <Skeleton height="30px" width="80px" />
      </HStack>
      <HStack py={4} justifyContent={"space-between"}>
        <Skeleton height="15px" width="30%" />
        <HStack>
          <Skeleton height="15px" width="30px" />
          <Skeleton height="15px" width="30px" />
          <Skeleton height="15px" width="30px" />
        </HStack>
      </HStack>
      <HStack flexDirection={"column"} alignItems={"start"}>
        <Skeleton height="15px" width="30%" />
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

export default ProjectInfoSkeleton;

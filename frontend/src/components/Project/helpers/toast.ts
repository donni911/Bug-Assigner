
export const showErrorMessage = (toast: any, str?: string) => {
    console.log(str);

    toast({
        title: str || `Something went wrong.`,
        status: "error",
        duration: 5000,
        isClosable: true,
    });
};

export const showSuccessMessage = (toast: any, str: string) => {
    toast({
        title: str,
        status: "success",
        duration: 5000,
        isClosable: true,
    });
};
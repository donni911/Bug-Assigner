// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from '@chakra-ui/react'



const theme = extendTheme({
    components: {
        Button: {
            // 1. We can update the base styles
            baseStyle: {
                borderRadius: 'sm',
                border: '1px solid #000',
                background: "#fff",
                backgroundColor: "#fff",
                _hover: {
                    boxShadow: "2px 2px 0 black , 2px 2px 0 cyan",
                    background: "#fff",
                    backgroundColor: "#fff",
                }
            },
            // 2. We can add a new button size or extend existing
            sizes: {

            },
            // 3. We can add a new visual variant
            variants: {

            },
            // 6. We can overwrite defaultProps
            defaultProps: {
            },
        },
    },
})

export default theme
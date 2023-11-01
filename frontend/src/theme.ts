// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from '@chakra-ui/react'



const theme = extendTheme({
    components: {
        Button: {
            // 1. We can update the base styles
            baseStyle: {

            },
            // 2. We can add a new button size or extend existing
            sizes: {

            },
            // 3. We can add a new visual variant
            variants: {
                'primary': {
                    color: '#000',
                    borderRadius: 'sm',
                    border: '1px solid #000',
                    background: "#fff",
                    backgroundColor: "#fff",
                    willChange: 'transform',
                    _hover: {
                        boxShadow: "2px 2px 0 black , 2px 2px 0 cyan",
                        background: "#fff",
                        backgroundColor: "#fff",
                    },
                    _active: {
                        background: "#fff",
                        backgroundColor: "#fff",
                        transform: 'scale(0.98)'
                    }
                },
                "black": {
                    background: "#000",
                    backgroundColor: "#000",
                    color: '#fff',
                    _hover: {
                        boxShadow: "2px 2px 0 black , 2px 2px 0 cyan",
                        color: '#000',
                    },
                },


            },
            // 6. We can overwrite defaultProps
            defaultProps: {

            },
        },

        Text: {
            variants: {
                'full-block': {
                    _before: {
                        content: '""',
                        position: 'absolute',
                        inset: '0px'
                    }
                }
            },
        },

        Modal: {
            baseStyle: {
                dialog: {
                    borderRadius: 'sm',
                    border: '1px solid #000',
                    background: "#fff",
                    backgroundColor: "#fff",
                }

            },
        },

        Input: {
            baseStyle: {
                field: {

                    borderRadius: 'sm',
                    border: '1px solid #000',
                    background: "#fff",
                    backgroundColor: "#fff",
                }
            },
        },
    },
})

export default theme
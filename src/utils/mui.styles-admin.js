export const InputFilledStyleAdmin = {
    fontFamily: "Teko",
    '& .MuiInputLabel-filled': {
        fontSize: "20px",
        fontFamily: "Teko",
        color: '#000',
        '&.Mui-focused': {
            color: '#000'
        },
    },
    '& .MuiFilledInput-root': {
        color: '#000',
        fontSize: "18px",
        fontFamily: "Teko",
        "&:hover:not(.Mui-focused)": {
            "&:before": {
                borderWidth: '2px',
                borderColor: "#57cc99",
            },
        },
        '&:before': {
            borderColor: '#38A3A5',
            borderWidth: '2px'
        },
        '&:after': {
            borderColor: '#57cc99',
            borderWidth: '2px'
        },
        '&.MuiFormControl-fullWidth)': {
            flex: 1,
            width: 'auto'
        },
        '&:not(.MuiFormControl-fullWidth)': {
            flexStroke: '0',
            minWidth: '250px'
        }
    }
}
import * as matrixUtils from "@/matrixUtils/MatrixUtils";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

import * as math from "mathjs";

const MatrixDecoder = () => {
    const keyMatrixRef = useRef<HTMLInputElement>(null);
    const messageMatrixRef = useRef<HTMLInputElement>(null);

    const [keyMatrixInverse, setKeyMatrixInverse] = useState<string>();
    const [message, setMessage] = useState<string>();

    const decodeMessage = () => {
        const keyMatrixStr = keyMatrixRef.current?.value.trim();
        const messageMatrixStr = keyMatrixRef.current?.value.trim();

        if (keyMatrixStr === "" || messageMatrixStr === "")
            return console.log("Inputs can't be null");

        const messageMatrix = JSON.parse(
            messageMatrixRef.current?.value as string
        );
        const keyMatrix = JSON.parse(keyMatrixRef.current?.value as string);

        const keyMatrixInverse = math.inv(keyMatrix);
        setKeyMatrixInverse(matrixUtils.getReadableMatrix(keyMatrixInverse));

        const decodedMessageMatrix = math
            .multiply(math.matrix(messageMatrix), math.matrix(keyMatrixInverse))
            .toArray();

        const roundedMatrix = math.round(decodedMessageMatrix);

        const asciiMessage = roundedMatrix.flat();

        setMessage(matrixUtils.convertAsciiToMessage(asciiMessage));
    };

    return (
        <>
            <Typography sx={{ pb: 3, fontWeight: 500 }}>
                Message Decoder
            </Typography>
            <Paper sx={{ p: 3 }} elevation={3}>
                <Typography sx={{ fontWeight: 500, pb: 1 }}>
                    Key Matrix:{" "}
                </Typography>
                <TextField
                    inputRef={keyMatrixRef}
                    multiline
                    minRows={5}
                    maxRows={5}
                    sx={{ mb: 3, width: "100%" }}
                />
                <Typography sx={{ fontWeight: 500, pb: 1 }}>
                    Message Matrix:{" "}
                </Typography>
                <TextField
                    inputRef={messageMatrixRef}
                    multiline
                    minRows={5}
                    maxRows={5}
                    sx={{ mb: 3, width: "100%" }}
                />
                <Button
                    onClick={decodeMessage}
                    color="success"
                    sx={{ width: "100%", mb: 5 }}
                    variant="contained"
                >
                    Decode
                </Button>
                <br />
                {keyMatrixInverse && message && (
                    <div>
                        <Typography sx={{ fontWeight: 500, pb: 1 }}>
                            Key Matrix Inverse:{" "}
                        </Typography>

                        <TextField
                            value={keyMatrixInverse}
                            multiline
                            minRows={8}
                            maxRows={8}
                            sx={{ mb: 3, width: "100%" }}
                        />
                        <Typography sx={{ fontWeight: 500, pb: 1 }}>
                            Decoded Message:{" "}
                        </Typography>
                        <TextField
                            value={message}
                            multiline
                            minRows={8}
                            maxRows={8}
                            sx={{ mb: 3, width: "100%" }}
                        />
                    </div>
                )}
            </Paper>
        </>
    );
};

export default MatrixDecoder;

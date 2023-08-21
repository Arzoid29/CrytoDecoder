import Head from "next/head";

import { Box, Button, Container, Typography } from "@mui/material";

import MatrixEncoder from "@/components/MatrixEncoder";
import { useState } from "react";
import MatrixDecoder from "@/components/MatrixDecoder";

export default function Home() {
    const [isEncoding, setIsEncoding] = useState<boolean | null>(null);
    const [isDecoding, setIsDecoding] = useState<boolean | null>(null);
    return (
        <>
            <Head>
                <title>Crypto Decoder</title>
            </Head>
            <Typography variant="h2" sx={{ py: 5, textAlign: "center" }}>
                Crypto Decoder
            </Typography>
            <Container sx={{ mb: 5 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 9,
                    }}
                >
                    <Button
                        onClick={() => {
                            setIsEncoding(true);
                            setIsDecoding(false);
                        }}
                        color="info"
                        variant="contained"
                        sx={{ width: "49.5%" }}
                    >
                        Encode
                    </Button>
                    <Button
                        onClick={() => {
                            setIsDecoding(true);
                            setIsEncoding(false);
                        }}
                        color="info"
                        variant="outlined"
                        sx={{ width: "49.5%" }}
                    >
                        Decode
                    </Button>
                </Box>
                {isEncoding && <MatrixEncoder />}
                {isDecoding && <MatrixDecoder/>}
            </Container>
        </>
    );
}

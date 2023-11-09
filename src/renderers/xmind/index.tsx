import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {DocRenderer} from "../..";
import { arrayBufferFileLoader } from "../../utils/fileLoaders";
import {XMindEmbedViewer} from "xmind-embed-viewer"
import {useTranslation} from "../../hooks/useTranslation";
const XmindRenderer: DocRenderer = (props) => {
    const {
        mainState: { currentDocument },
    } = props;
    const { t } = useTranslation();

    const [loadedXmind, setLoadedXmind] = useState(false);
    const [corruptedFile, setCorruptedFile] = useState(false);

    useEffect(() => {
        if (!currentDocument || loadedXmind) return;

        let canvas = document.getElementById("xmind-renderer");
        try {
            if(canvas) {
                const viewer = new XMindEmbedViewer({
                    el: '#xmind-renderer',
                    file: currentDocument.fileData as ArrayBuffer,
                    region: 'cn' ,
                    styles: {
                        'height': '100%',
                        'width': '100%'
                    }
                })
                setLoadedXmind(true);
            }

        } catch (error) {
            setCorruptedFile(true);
        }
    }, [currentDocument, setLoadedXmind]);

    if (corruptedFile) {
        return (
            <Container id="xmind-renderer"  {...props}>
                <div>{t("brokenFile")}</div>
            </Container>
        );
    }

    return (
        <Container id="xmind-renderer">

        </Container>
    );
};

XmindRenderer.fileTypes = ["xmind","application/vnd.xmind.workbook"];
XmindRenderer.weight = 0;
XmindRenderer.fileLoader = arrayBufferFileLoader;

export default XmindRenderer;
const Container = styled.div`
  height: 100%;
  width: 100%;
`;

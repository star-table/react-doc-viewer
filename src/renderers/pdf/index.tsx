import React from "react";
import { Viewer } from '@react-pdf-viewer/core';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import styled from "styled-components";
import { DocRenderer, IStyledProps } from "../..";
import { PDFProvider } from "./state";
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';

const PDFRenderer: DocRenderer = (props) => {

    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;
    const thumbnailPluginInstance = thumbnailPlugin({
        thumbnailWidth: 150,
    });
    const { Thumbnails } = thumbnailPluginInstance;

    const {
        mainState,
    } = props;

    const {
        currentDocument,
    } = mainState;
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <PDFProvider mainState={mainState}>
        <div
            className="rpv-core__viewer"
            style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                display: 'flex',
                height: '100%',
                width: '100%',
                position: 'relative',
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '2px',
                    bottom: '16px',
                    display: 'flex',
                    left: '60%',
                    padding: '4px',
                    position: 'absolute',
                    transform: 'translate(-50%, 0)',
                    zIndex: 1,
                }}
            >
                <Toolbar>
                    {(props: ToolbarSlot) => {
                        const {
                            CurrentPageInput,
                            Download,
                            EnterFullScreen,
                            GoToNextPage,
                            GoToPreviousPage,
                            NumberOfPages,
                            ZoomIn,
                            ZoomOut,
                            Print
                        } = props;
                        return (
                            <>
                                <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                    <GoToPreviousPage />
                                </div>
                                <div style={{ padding: '0px 2px', width: '2rem' }}>
                                    <CurrentPageInput />
                                </div>
                                <div style={{ padding: '0px 2px', width: '2rem'  }}>
                                    / <NumberOfPages />
                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    <GoToNextPage />
                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    <ZoomOut />
                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    <ZoomIn />
                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    <Print />
                                </div>
                                <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                    <EnterFullScreen />
                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    <Download />
                                </div>
                            </>
                        );
                    }}
                </Toolbar>
            </div>
            <div
                style={{
                    borderRight: '1px solid rgba(0, 0, 0, 0.3)',
                    overflow: 'auto',
                    width: '20%',
                }}
            >
                <Thumbnails />
            </div>
            <div
                style={{
                    flex: 1,
                    overflow: 'hidden',
                }}
            >
                <Viewer fileUrl={currentDocument?.fileData as Uint8Array} plugins={[thumbnailPluginInstance,toolbarPluginInstance]} />
            </div>
        </div>
    </PDFProvider>
    </Worker>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;

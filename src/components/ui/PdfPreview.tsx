import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

function PdfPreview({ pdfBlobUrl }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  // 1. Criar um estado para a largura e uma referência para o container
  const [containerWidth, setContainerWidth] = useState(null);
  const pdfWrapperRef = useRef(null);

  // 2. Usar ResizeObserver para atualizar a largura quando a tela mudar
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setContainerWidth(width);
    });

    if (pdfWrapperRef.current) {
      resizeObserver.observe(pdfWrapperRef.current);
    }

    return () => {
      if (pdfWrapperRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className='w-full flex flex-col items-center'> {/* Adicionei items-center */}

      {/* Ajustei o cabeçalho para quebrar linha em telas muito pequenas (flex-wrap) */}
      <div className="w-full px-6 py-4 flex gap-2 items-center justify-between flex-col gap-3 w-full">

        <div className="text-sm text-center whitespace-nowrap">
          <p className="font-semibold">
            Pág. {pageNumber} de {numPages}
          </p>
        </div>

        <div className="w-full flex flex-row justify-between gap-2">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(prev => prev - 1)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-primary disabled:opacity-40 text-white min-w-[100px]"
          >
            ← Anterior
          </button>


          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(prev => prev + 1)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-primary disabled:opacity-40 text-white min-w-[100px]"
          >
            Próxima →
          </button>
        </div>
      </div>

      {/* 3. A div container com a referência (ref) */}
      <div
        ref={pdfWrapperRef}
        className="w-full flex justify-center p-4" // Adicionei padding para não colar na borda
      >
        <Document
          file={pdfBlobUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="p-4">Carregando PDF...</div>}
          error={<div className="p-4 text-red-500">Erro ao carregar PDF!</div>}
          className="flex justify-center" // Centraliza o Documento se ele for menor que a tela
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="rounded-lg overflow-hidden shadow-lg" // Adicionei sombra para destaque
            // 4. A mágica acontece aqui: Passamos a largura dinâmica
            width={containerWidth ? Math.min(containerWidth, 800) : null}
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfPreview;
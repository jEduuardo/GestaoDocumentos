
import React from 'react';

// This is a placeholder for BPMN diagram that would be implemented in a real app
// In a full implementation, this would use a library like bpmn-js
const BPMNViewer = ({ processId }: { processId: number }) => {
  return (
    <div className="bpmn-container h-[500px] border rounded-md bg-white p-4">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Diagrama BPMN</h3>
          <p className="text-muted-foreground">
            Este é um placeholder para o diagrama BPMN do processo #{processId}.
            <br />
            Em uma aplicação completa, aqui seria renderizado o diagrama usando bpmn-js ou similar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BPMNViewer;

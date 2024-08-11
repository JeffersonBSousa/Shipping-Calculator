import { create } from "zustand";

interface FormData {
  // Ficha do motorista
  nomeMotorista: string;
  modeloCaminhao: string;
  mediaCaminhao: string;
  // Calculadora
  valorFrete: string;
  distanciaViagem: string;
  preçoCombustivel: string;
  alimentação: string;
  pagamentoAjudante: string;
  estadia: string;
  outrosCustos: string;

  // Ficha do motorista
  setNomeMotorista: (value: string) => void;
  setModeloCaminhao: (value: string) => void;
  setMediaCaminhao: (value: string) => void;
  // Calculadora
  setValorFrete: (value: string) => void;
  setDistanciaViagem: (value: string) => void;
  setPreçoCombustivel: (value: string) => void;
  setAlimentação: (value: string) => void;
  setPagamentoAjudante: (value: string) => void;
  setEstadia: (value: string) => void;
  setOutrosCustos: (value: string) => void;
}

const useFormStore = create<FormData>((set) => ({
  nomeMotorista: ' ',
  modeloCaminhao: ' ',
  mediaCaminhao: '',
  // Calculadora
  valorFrete: "0",
  distanciaViagem: "0",
  preçoCombustivel: "0",
  alimentação: "0",
  pagamentoAjudante: "0",
  estadia: "0",
  outrosCustos: "0",

  // Ficha do motorista
  setNomeMotorista: (value: string) => set({ nomeMotorista: value }),
  setModeloCaminhao: (value: string) => set({ modeloCaminhao: value }),
  setMediaCaminhao: (value: string) => set({ mediaCaminhao: value }),
  // Calculadora
  setValorFrete: (value: string) => set({ valorFrete: value }),
  setDistanciaViagem: (value: string) => set({ distanciaViagem: value }),
  setPreçoCombustivel: (value: string) => set({ preçoCombustivel: value }),
  setAlimentação: (value: string) => set({ alimentação: value }),
  setPagamentoAjudante: (value: string) => set({ pagamentoAjudante: value }),
  setEstadia: (value: string) => set({ estadia: value }),
  setOutrosCustos: (value: string) => set({ outrosCustos: value }),
}));

export default useFormStore;

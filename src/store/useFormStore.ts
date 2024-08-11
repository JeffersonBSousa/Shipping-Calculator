import { create } from 'zustand';

interface Viagem {
  valorFrete: string;
  distanciaViagem: string;
  preçoCombustivel: string;
  alimentação: string;
  pagamentoAjudante: string;
  estadia: string;
  outrosCustos: string;
  lucro: string;
}

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

  // Métodos de atualização
  setNomeMotorista: (value: string) => void;
  setModeloCaminhao: (value: string) => void;
  setMediaCaminhao: (value: string) => void;
  setValorFrete: (value: string) => void;
  setDistanciaViagem: (value: string) => void;
  setPreçoCombustivel: (value: string) => void;
  setAlimentação: (value: string) => void;
  setPagamentoAjudante: (value: string) => void;
  setEstadia: (value: string) => void;
  setOutrosCustos: (value: string) => void;

  viagens: Viagem[];
  addViagem: (viagem: Viagem) => void;
  removeViagem: (index: number) => void;
  removeAllViagens: () => void;
  calcularTotais: () => { totalFretes: number; totalLucro: number; totalDistancia: number; totalCustos: number };
}

const useFormStore = create<FormData>((set, get) => ({
  nomeMotorista: '',
  modeloCaminhao: '',
  mediaCaminhao: '', // Adiciona o mediaCaminhao aqui

  valorFrete: '0',
  distanciaViagem: '0',
  preçoCombustivel: '0',
  alimentação: '0',
  pagamentoAjudante: '0',
  estadia: '0',
  outrosCustos: '0',

  setNomeMotorista: (value) => set({ nomeMotorista: value }),
  setModeloCaminhao: (value) => set({ modeloCaminhao: value }),
  setMediaCaminhao: (value) => set({ mediaCaminhao: value }),
  setValorFrete: (value) => set({ valorFrete: value }),
  setDistanciaViagem: (value) => set({ distanciaViagem: value }),
  setPreçoCombustivel: (value) => set({ preçoCombustivel: value }),
  setAlimentação: (value) => set({ alimentação: value }),
  setPagamentoAjudante: (value) => set({ pagamentoAjudante: value }),
  setEstadia: (value) => set({ estadia: value }),
  setOutrosCustos: (value) => set({ outrosCustos: value }),

  viagens: [],
  addViagem: (viagem) => set(state => ({ viagens: [...state.viagens, viagem] })),
  removeViagem: (index) => set(state => ({
    viagens: state.viagens.filter((_, i) => i !== index),
  })),
  removeAllViagens: () => set({ viagens: [] }),

  calcularTotais: () => {
    const { viagens, mediaCaminhao } = get();
    const totalFretes = viagens.reduce((sum, viagem) => sum + parseFloat(viagem.valorFrete), 0);
    const totalLucro = viagens.reduce((sum, viagem) => sum + parseFloat(viagem.lucro), 0);
    const totalDistancia = viagens.reduce((sum, viagem) => sum + parseFloat(viagem.distanciaViagem), 0);
    const totalCustos = viagens.reduce((sum, viagem) => {
      const custoCombustivel = parseFloat(viagem.preçoCombustivel) * (parseFloat(viagem.distanciaViagem) / parseFloat(mediaCaminhao || '1')); // Use o mediaCaminhao aqui
      return sum + parseFloat(viagem.alimentação) + parseFloat(viagem.pagamentoAjudante) + parseFloat(viagem.estadia) + parseFloat(viagem.outrosCustos) + custoCombustivel;
    }, 0);
    return { totalFretes, totalLucro, totalDistancia, totalCustos };
  }
}));

export default useFormStore;

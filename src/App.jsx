import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { ShoppingCart, MapPin, Truck, Store, User, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import './App.css'

// Dados dos produtos
const produtos = [
  {
    id: 1,
    nome: "Conjunto Feminino Elegante",
    preco: 2500,
    categoria: "feminino",
    imagem: "/src/assets/roupa-feminina-1.jpg",
    descricao: "Conjunto moderno e elegante para mulheres",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Branco", "Preto", "Bege"]
  },
  {
    id: 2,
    nome: "Conjunto Executivo Feminino",
    preco: 3200,
    categoria: "feminino",
    imagem: "/src/assets/conjunto-feminino.jpg",
    descricao: "Conjunto profissional para o dia a dia",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Preto", "Azul Marinho", "Cinza"]
  },
  {
    id: 3,
    nome: "Blusa Feminina Casual",
    preco: 1200,
    categoria: "feminino",
    imagem: "/src/assets/blusa-feminina.jpg",
    descricao: "Blusa confortável para uso casual",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Rosa", "Branco", "Azul"]
  },
  {
    id: 4,
    nome: "Look Masculino Verão",
    preco: 2800,
    categoria: "masculino",
    imagem: "/src/assets/roupa-masculina-1.jpg",
    descricao: "Conjunto masculino moderno para o verão",
    tamanhos: ["P", "M", "G", "GG", "XG"],
    cores: ["Azul", "Preto", "Branco"]
  },
  {
    id: 5,
    nome: "Estilo Casual Masculino",
    preco: 2200,
    categoria: "masculino",
    imagem: "/src/assets/roupa-masculina-2.jpg",
    descricao: "Look casual e confortável para homens",
    tamanhos: ["P", "M", "G", "GG", "XG"],
    cores: ["Preto", "Cinza", "Verde"]
  },
  {
    id: 6,
    nome: "Vestido Elegante",
    preco: 3800,
    categoria: "feminino",
    imagem: "/src/assets/vestido-elegante.jpg",
    descricao: "Vestido elegante para ocasiões especiais",
    tamanhos: ["P", "M", "G", "GG"],
    cores: ["Preto", "Azul", "Vermelho"]
  }
]

function App() {
  const [carrinho, setCarrinho] = useState([])
  const [categoriaFiltro, setCategoriaFiltro] = useState("todos")
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [checkoutAberto, setCheckoutAberto] = useState(false)
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false)
  const [errosValidacao, setErrosValidacao] = useState({})
  const [dadosCliente, setDadosCliente] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    provincia: ''
  })
  const [opcaoEntrega, setOpcaoEntrega] = useState('loja')

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('awa-fashion-carrinho')
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo))
    }
  }, [])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('awa-fashion-carrinho', JSON.stringify(carrinho))
  }, [carrinho])

  const adicionarAoCarrinho = (produto, tamanho, cor) => {
    const itemCarrinho = {
      ...produto,
      tamanhoSelecionado: tamanho,
      corSelecionada: cor,
      quantidade: 1,
      id: `${produto.id}-${tamanho}-${cor}`
    }
    
    const itemExistente = carrinho.find(item => item.id === itemCarrinho.id)
    
    if (itemExistente) {
      setCarrinho(carrinho.map(item => 
        item.id === itemCarrinho.id 
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ))
    } else {
      setCarrinho([...carrinho, itemCarrinho])
    }
  }

  const removerDoCarrinho = (id) => {
    setCarrinho(carrinho.filter(item => item.id !== id))
  }

  const atualizarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(id)
    } else {
      setCarrinho(carrinho.map(item => 
        item.id === id 
          ? { ...item, quantidade: novaQuantidade }
          : item
      ))
    }
  }

  const calcularTotal = () => {
    const subtotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0)
    let custoEntrega = 0
    
    if (opcaoEntrega === 'casa') {
      custoEntrega = 300 // 300 MT para entrega em casa
    } else if (opcaoEntrega === 'delivery') {
      custoEntrega = 150 // 150 MT para delivery
    }
    
    return { subtotal, custoEntrega, total: subtotal + custoEntrega }
  }

  const validarFormulario = () => {
    const erros = {}
    
    if (!dadosCliente.nome.trim()) {
      erros.nome = 'Nome é obrigatório'
    }
    
    if (!dadosCliente.telefone.trim()) {
      erros.telefone = 'Telefone é obrigatório'
    } else if (!/^\+?258\s?\d{2}\s?\d{3}\s?\d{4}$/.test(dadosCliente.telefone.replace(/\s/g, ''))) {
      erros.telefone = 'Formato de telefone inválido (+258 XX XXX XXXX)'
    }
    
    if (!dadosCliente.email.trim()) {
      erros.email = 'Email é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dadosCliente.email)) {
      erros.email = 'Email inválido'
    }
    
    if (opcaoEntrega === 'casa') {
      if (!dadosCliente.endereco.trim()) {
        erros.endereco = 'Endereço é obrigatório para entrega em casa'
      }
      if (!dadosCliente.cidade.trim()) {
        erros.cidade = 'Cidade é obrigatória para entrega em casa'
      }
      if (!dadosCliente.provincia) {
        erros.provincia = 'Província é obrigatória para entrega em casa'
      }
    }
    
    setErrosValidacao(erros)
    return Object.keys(erros).length === 0
  }

  const confirmarPedido = () => {
    if (validarFormulario()) {
      // Simular confirmação do pedido
      setPedidoConfirmado(true)
      setCarrinho([])
      localStorage.removeItem('awa-fashion-carrinho')
      
      // Fechar modal após 3 segundos
      setTimeout(() => {
        setPedidoConfirmado(false)
        setCheckoutAberto(false)
        setDadosCliente({
          nome: '',
          telefone: '',
          email: '',
          endereco: '',
          cidade: '',
          provincia: ''
        })
        setOpcaoEntrega('loja')
        setErrosValidacao({})
      }, 3000)
    }
  }

  const produtosFiltrados = categoriaFiltro === "todos" 
    ? produtos 
    : produtos.filter(produto => produto.categoria === categoriaFiltro)

  const { subtotal, custoEntrega, total } = calcularTotal()

  if (pedidoConfirmado) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pedido Confirmado!</h1>
          <p className="text-gray-600 mb-4">
            Obrigado pela sua compra! Você receberá um WhatsApp em breve com os detalhes do pagamento.
          </p>
          <p className="text-sm text-gray-500">
            Redirecionando para a loja...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Awa Fashion</h1>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Nampula, Moçambique</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Sheet open={carrinhoAberto} onOpenChange={setCarrinhoAberto}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Carrinho
                    {carrinho.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {carrinho.reduce((total, item) => total + item.quantidade, 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Seu Carrinho</SheetTitle>
                    <SheetDescription>
                      {carrinho.length === 0 ? "Seu carrinho está vazio" : `${carrinho.length} item(s) no carrinho`}
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-4">
                    {carrinho.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img src={item.imagem} alt={item.nome} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.nome}</h4>
                          <p className="text-sm text-gray-600">
                            {item.tamanhoSelecionado} • {item.corSelecionada}
                          </p>
                          <p className="text-sm font-medium">{item.preco} MT</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                            >
                              -
                            </Button>
                            <span className="text-sm font-medium">{item.quantidade}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removerDoCarrinho(item.id)}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                    
                    {carrinho.length > 0 && (
                      <div className="border-t pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{subtotal} MT</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Entrega:</span>
                            <span>{custoEntrega} MT</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>{total} MT</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-4" 
                          onClick={() => {
                            setCarrinhoAberto(false)
                            setCheckoutAberto(true)
                          }}
                        >
                          Finalizar Compra
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-4 mb-8">
          <Button 
            variant={categoriaFiltro === "todos" ? "default" : "outline"}
            onClick={() => setCategoriaFiltro("todos")}
          >
            Todos
          </Button>
          <Button 
            variant={categoriaFiltro === "feminino" ? "default" : "outline"}
            onClick={() => setCategoriaFiltro("feminino")}
          >
            Feminino
          </Button>
          <Button 
            variant={categoriaFiltro === "masculino" ? "default" : "outline"}
            onClick={() => setCategoriaFiltro("masculino")}
          >
            Masculino
          </Button>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard 
              key={produto.id} 
              produto={produto} 
              onAdicionarCarrinho={adicionarAoCarrinho}
            />
          ))}
        </div>
      </div>

      {/* Modal de Checkout */}
      <Sheet open={checkoutAberto} onOpenChange={setCheckoutAberto}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Finalizar Compra</SheetTitle>
            <SheetDescription>
              Complete seus dados para finalizar o pedido
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Dados do Cliente */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <User className="h-4 w-4 mr-2" />
                Dados Pessoais
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input 
                    id="nome"
                    value={dadosCliente.nome}
                    onChange={(e) => setDadosCliente({...dadosCliente, nome: e.target.value})}
                    placeholder="Seu nome"
                    className={errosValidacao.nome ? "border-red-500" : ""}
                  />
                  {errosValidacao.nome && (
                    <p className="text-red-500 text-xs mt-1">{errosValidacao.nome}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input 
                    id="telefone"
                    value={dadosCliente.telefone}
                    onChange={(e) => setDadosCliente({...dadosCliente, telefone: e.target.value})}
                    placeholder="+258 XX XXX XXXX"
                    className={errosValidacao.telefone ? "border-red-500" : ""}
                  />
                  {errosValidacao.telefone && (
                    <p className="text-red-500 text-xs mt-1">{errosValidacao.telefone}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={dadosCliente.email}
                  onChange={(e) => setDadosCliente({...dadosCliente, email: e.target.value})}
                  placeholder="seu@email.com"
                  className={errosValidacao.email ? "border-red-500" : ""}
                />
                {errosValidacao.email && (
                  <p className="text-red-500 text-xs mt-1">{errosValidacao.email}</p>
                )}
              </div>
            </div>

            {/* Opções de Entrega */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                Opções de Entrega
              </h3>
              
              <RadioGroup value={opcaoEntrega} onValueChange={setOpcaoEntrega}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="loja" id="loja" />
                  <Label htmlFor="loja" className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Store className="h-4 w-4 mr-2" />
                        <span>Retirar na Loja</span>
                      </div>
                      <span className="text-green-600 font-medium">Grátis</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Rua Principal, Nampula - Horário: 8h às 18h
                    </p>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="casa" id="casa" />
                  <Label htmlFor="casa" className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        <span>Entrega em Casa</span>
                      </div>
                      <span className="font-medium">300 MT</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Entrega em todo Moçambique - 3 a 7 dias úteis
                    </p>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery" className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>Delivery Rápido</span>
                      </div>
                      <span className="font-medium">150 MT</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Apenas em Nampula - Entrega no mesmo dia
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Endereço (se entrega em casa) */}
            {opcaoEntrega === 'casa' && (
              <div className="space-y-4">
                <h3 className="font-medium">Endereço de Entrega</h3>
                <div>
                  <Label htmlFor="endereco">Endereço Completo</Label>
                  <Input 
                    id="endereco"
                    value={dadosCliente.endereco}
                    onChange={(e) => setDadosCliente({...dadosCliente, endereco: e.target.value})}
                    placeholder="Rua, número, bairro"
                    className={errosValidacao.endereco ? "border-red-500" : ""}
                  />
                  {errosValidacao.endereco && (
                    <p className="text-red-500 text-xs mt-1">{errosValidacao.endereco}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input 
                      id="cidade"
                      value={dadosCliente.cidade}
                      onChange={(e) => setDadosCliente({...dadosCliente, cidade: e.target.value})}
                      placeholder="Sua cidade"
                      className={errosValidacao.cidade ? "border-red-500" : ""}
                    />
                    {errosValidacao.cidade && (
                      <p className="text-red-500 text-xs mt-1">{errosValidacao.cidade}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="provincia">Província</Label>
                    <Select 
                      value={dadosCliente.provincia}
                      onValueChange={(value) => setDadosCliente({...dadosCliente, provincia: value})}
                    >
                      <SelectTrigger className={errosValidacao.provincia ? "border-red-500" : ""}>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nampula">Nampula</SelectItem>
                        <SelectItem value="maputo">Maputo</SelectItem>
                        <SelectItem value="beira">Beira</SelectItem>
                        <SelectItem value="tete">Tete</SelectItem>
                        <SelectItem value="quelimane">Quelimane</SelectItem>
                        <SelectItem value="pemba">Pemba</SelectItem>
                        <SelectItem value="lichinga">Lichinga</SelectItem>
                        <SelectItem value="xai-xai">Xai-Xai</SelectItem>
                        <SelectItem value="inhambane">Inhambane</SelectItem>
                        <SelectItem value="chimoio">Chimoio</SelectItem>
                        <SelectItem value="gurué">Gurué</SelectItem>
                      </SelectContent>
                    </Select>
                    {errosValidacao.provincia && (
                      <p className="text-red-500 text-xs mt-1">{errosValidacao.provincia}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Resumo do Pedido */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-4">Resumo do Pedido</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({carrinho.reduce((total, item) => total + item.quantidade, 0)} itens):</span>
                  <span>{subtotal} MT</span>
                </div>
                <div className="flex justify-between">
                  <span>Entrega:</span>
                  <span>{custoEntrega} MT</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>{total} MT</span>
                </div>
              </div>
              
              <Button className="w-full mt-6" size="lg" onClick={confirmarPedido}>
                Confirmar Pedido
              </Button>
              
              <p className="text-xs text-gray-600 mt-4 text-center">
                Ao confirmar, você receberá um WhatsApp com os detalhes do pagamento
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Awa Fashion</h3>
              <p className="text-gray-400 mb-4">
                Sua loja de roupas em Nampula com entrega para todo Moçambique.
              </p>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Rua Principal, Nampula</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+258 XX XXX XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>contato@awafashion.co.mz</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Horário de Funcionamento</h4>
              <div className="text-gray-400 space-y-1">
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 16h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Awa Fashion. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Componente do Card de Produto
function ProdutoCard({ produto, onAdicionarCarrinho }) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('')
  const [corSelecionada, setCorSelecionada] = useState('')

  const podeAdicionar = tamanhoSelecionado && corSelecionada

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img 
          src={produto.imagem} 
          alt={produto.nome}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg">{produto.nome}</CardTitle>
        <CardDescription>{produto.descricao}</CardDescription>
        <div className="text-2xl font-bold text-green-600">
          {produto.preco} MT
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Tamanho:</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {produto.tamanhos.map((tamanho) => (
              <Button
                key={tamanho}
                variant={tamanhoSelecionado === tamanho ? "default" : "outline"}
                size="sm"
                onClick={() => setTamanhoSelecionado(tamanho)}
              >
                {tamanho}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium">Cor:</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {produto.cores.map((cor) => (
              <Button
                key={cor}
                variant={corSelecionada === cor ? "default" : "outline"}
                size="sm"
                onClick={() => setCorSelecionada(cor)}
              >
                {cor}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          disabled={!podeAdicionar}
          onClick={() => onAdicionarCarrinho(produto, tamanhoSelecionado, corSelecionada)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Adicionar ao Carrinho
        </Button>
      </CardFooter>
    </Card>
  )
}

export default App


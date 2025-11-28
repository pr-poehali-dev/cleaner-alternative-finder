import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  crueltyFree: boolean;
  vegan: boolean;
  image: string;
  description: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Экологичное средство для мытья посуды',
    category: 'Для посуды',
    price: 450,
    brand: 'EcoClean',
    crueltyFree: true,
    vegan: true,
    image: '🧼',
    description: 'Натуральное средство на основе растительных компонентов'
  },
  {
    id: 2,
    name: 'Органический порошок для стирки',
    category: 'Для стирки',
    price: 890,
    brand: 'GreenWash',
    crueltyFree: true,
    vegan: true,
    image: '🧴',
    description: 'Гипоаллергенный порошок без фосфатов'
  },
  {
    id: 3,
    name: 'Универсальный очиститель',
    category: 'Для уборки',
    price: 550,
    brand: 'PureHome',
    crueltyFree: true,
    vegan: true,
    image: '🧽',
    description: 'Подходит для всех поверхностей'
  },
  {
    id: 4,
    name: 'Средство для мытья окон',
    category: 'Для уборки',
    price: 390,
    brand: 'ClearView',
    crueltyFree: true,
    vegan: false,
    image: '✨',
    description: 'Без разводов и резкого запаха'
  },
  {
    id: 5,
    name: 'Кондиционер для белья',
    category: 'Для стирки',
    price: 680,
    brand: 'SoftNature',
    crueltyFree: true,
    vegan: true,
    image: '🌸',
    description: 'Натуральные ароматы лаванды и ромашки'
  },
  {
    id: 6,
    name: 'Гель для душа природный',
    category: 'Гигиена',
    price: 520,
    brand: 'BioCare',
    crueltyFree: true,
    vegan: true,
    image: '🌿',
    description: 'Увлажняющий гель с алоэ вера'
  }
];

const categories = ['Все', 'Для посуды', 'Для стирки', 'Для уборки', 'Гигиена'];
const brands = ['Все', 'EcoClean', 'GreenWash', 'PureHome', 'ClearView', 'SoftNature', 'BioCare'];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedBrand, setSelectedBrand] = useState('Все');
  const [priceRange, setPriceRange] = useState('Все');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'Все' || product.brand === selectedBrand;
    
    let matchesPrice = true;
    if (priceRange === 'До 500') matchesPrice = product.price <= 500;
    else if (priceRange === '500-700') matchesPrice = product.price > 500 && product.price <= 700;
    else if (priceRange === 'Более 700') matchesPrice = product.price > 700;
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-2xl">
                🌱
              </div>
              <h1 className="text-2xl font-bold">EcoChoice</h1>
            </div>
            <nav className="flex gap-6 items-center">
              <Button variant="ghost" className="gap-2">
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button variant="ghost" className="gap-2">
                <Icon name="Search" size={18} />
                Поиск
              </Button>
              <Button variant="ghost" className="gap-2">
                <Icon name="ShoppingBag" size={18} />
                Каталог
              </Button>
              <Button variant="ghost" className="gap-2 relative">
                <Icon name="Heart" size={18} />
                Избранное
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-secondary py-16 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Найди свой выбор без жестокости</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Подбираем точные аналоги бытовой химии, не тестируемые на животных
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Введите название средства, которое хотите заменить..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-72 space-y-6 animate-scale-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Filter" size={20} />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                    <TabsList className="grid grid-cols-2 gap-2 h-auto bg-transparent">
                      {categories.map(cat => (
                        <TabsTrigger 
                          key={cat} 
                          value={cat}
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          {cat}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Производитель</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите бренд" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Цена</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите диапазон" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Все">Все цены</SelectItem>
                      <SelectItem value="До 500">До 500 ₽</SelectItem>
                      <SelectItem value="500-700">500-700 ₽</SelectItem>
                      <SelectItem value="Более 700">Более 700 ₽</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory('Все');
                    setSelectedBrand('Все');
                    setPriceRange('Все');
                    setSearchQuery('');
                  }}
                >
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-accent">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="Sparkles" className="text-primary mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold mb-1">100% без жестокости</h3>
                    <p className="text-sm text-muted-foreground">
                      Все товары в нашем каталоге сертифицированы и не тестируются на животных
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Найдено товаров: <span className="font-semibold text-foreground">{filteredProducts.length}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="text-6xl mb-4">{product.image}</div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleFavorite(product.id)}
                        className="transition-transform hover:scale-110"
                      >
                        <Icon 
                          name="Heart" 
                          size={20} 
                          className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''} 
                        />
                      </Button>
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {product.crueltyFree && (
                        <Badge variant="secondary" className="gap-1">
                          <Icon name="Check" size={14} />
                          Cruelty-Free
                        </Badge>
                      )}
                      {product.vegan && (
                        <Badge variant="secondary" className="gap-1">
                          🌱 Vegan
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{product.brand}</span>
                      <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full gap-2 group-hover:bg-primary/90">
                      <Icon name="ShoppingCart" size={18} />
                      Подробнее
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={64} className="mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска или фильтры</p>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}

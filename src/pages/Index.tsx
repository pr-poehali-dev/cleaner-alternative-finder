import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import ComparisonCard from '@/components/ComparisonCard';

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

const comparisons = [
  {
    category: 'Для посуды',
    before: {
      name: 'Fairy Ultra',
      brand: 'P&G',
      price: 350,
      image: '🧴',
      tested: true
    },
    after: {
      name: 'Экологичное средство для мытья посуды',
      brand: 'EcoClean',
      price: 450,
      image: '🧼',
      crueltyFree: true,
      vegan: true
    }
  },
  {
    category: 'Для стирки',
    before: {
      name: 'Tide Alpine Fresh',
      brand: 'P&G',
      price: 750,
      image: '📦',
      tested: true
    },
    after: {
      name: 'Органический порошок для стирки',
      brand: 'GreenWash',
      price: 890,
      image: '🧴',
      crueltyFree: true,
      vegan: true
    }
  },
  {
    category: 'Для уборки',
    before: {
      name: 'Mr. Proper',
      brand: 'P&G',
      price: 480,
      image: '🧹',
      tested: true
    },
    after: {
      name: 'Универсальный очиститель',
      brand: 'PureHome',
      price: 550,
      image: '🧽',
      crueltyFree: true,
      vegan: true
    }
  }
];

export default function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'catalog' | 'favorites'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedBrand, setSelectedBrand] = useState('Все');
  const [priceRange, setPriceRange] = useState('Все');
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const [userProduct, setUserProduct] = useState('');
  const [userBrand, setUserBrand] = useState('');
  const [userCategory, setUserCategory] = useState('');
  const [matchResult, setMatchResult] = useState<Product | null>(null);

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
              <Button 
                variant={currentView === 'home' ? 'default' : 'ghost'} 
                className="gap-2"
                onClick={() => setCurrentView('home')}
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button 
                variant={currentView === 'search' ? 'default' : 'ghost'} 
                className="gap-2"
                onClick={() => setCurrentView('search')}
              >
                <Icon name="Search" size={18} />
                Подбор аналога
              </Button>
              <Button 
                variant={currentView === 'catalog' ? 'default' : 'ghost'} 
                className="gap-2"
                onClick={() => setCurrentView('catalog')}
              >
                <Icon name="ShoppingBag" size={18} />
                Каталог
              </Button>
              <Button 
                variant={currentView === 'favorites' ? 'default' : 'ghost'} 
                className="gap-2 relative"
                onClick={() => setCurrentView('favorites')}
              >
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

      {currentView === 'home' && (
      <>
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

      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Популярные замены</h2>
          <p className="text-muted-foreground">Узнай, чем заменить известные бренды</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {comparisons.map((comparison, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ComparisonCard
                before={comparison.before}
                after={comparison.after}
                category={comparison.category}
              />
            </div>
          ))}
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
      </>
      )}

      {currentView === 'search' && (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3">Подбор cruelty-free аналога</h2>
              <p className="text-lg text-muted-foreground">
                Укажи свое средство — найдем точную замену без жестокости
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={(e) => {
                e.preventDefault();
                const match = mockProducts.find(p => 
                  p.category === userCategory || userCategory === ''
                );
                setMatchResult(match || mockProducts[0]);
              }}>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Название твоего средства
                    </label>
                    <Input
                      placeholder="Например: Fairy Ultra, Tide, Domestos..."
                      value={userProduct}
                      onChange={(e) => setUserProduct(e.target.value)}
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Производитель
                    </label>
                    <Input
                      placeholder="Например: P&G, Henkel, Unilever..."
                      value={userBrand}
                      onChange={(e) => setUserBrand(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Категория
                    </label>
                    <Select value={userCategory} onValueChange={setUserCategory}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Выбери категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Для посуды">Для посуды</SelectItem>
                        <SelectItem value="Для стирки">Для стирки</SelectItem>
                        <SelectItem value="Для уборки">Для уборки</SelectItem>
                        <SelectItem value="Гигиена">Гигиена</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2 h-14 text-lg">
                    <Icon name="Sparkles" size={20} />
                    Найти cruelty-free аналог
                  </Button>
                </div>
              </form>

              {matchResult && (
                <div className="mt-8 pt-8 border-t animate-fade-in">
                  <h3 className="text-xl font-bold mb-4 text-center">Твоя замена найдена! 🎉</h3>
                  <Card className="border-2 border-primary/20 bg-accent/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-6xl">{matchResult.image}</div>
                        <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-primary/20">
                          <Icon name="Check" size={14} />
                          Точное совпадение
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl mt-4">{matchResult.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{matchResult.description}</p>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {matchResult.crueltyFree && (
                          <Badge variant="secondary" className="gap-1">
                            <Icon name="Check" size={14} />
                            Cruelty-Free
                          </Badge>
                        )}
                        {matchResult.vegan && (
                          <Badge variant="secondary" className="gap-1">
                            🌱 Vegan
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-muted-foreground">{matchResult.brand}</span>
                        <span className="text-2xl font-bold text-primary">{matchResult.price} ₽</span>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6 p-4 bg-secondary rounded-lg">
                    <div className="flex gap-3">
                      <Icon name="Info" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium mb-1">Почему этот аналог?</p>
                        <p className="text-sm text-muted-foreground">
                          Средство из категории "{matchResult.category}" с максимально похожими свойствами. 
                          Сертифицировано без тестов на животных, экологично и эффективно.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </section>
      )}

      {currentView === 'catalog' && (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3">Каталог cruelty-free средств</h2>
            <p className="text-lg text-muted-foreground">Все товары без жестокости к животным</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product, index) => (
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
        </section>
      )}

      {currentView === 'favorites' && (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3">Твое избранное</h2>
            <p className="text-lg text-muted-foreground">
              {favorites.length > 0 
                ? `Сохранено ${favorites.length} товаров` 
                : 'Пока пусто — добавь товары из каталога'}
            </p>
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.filter(p => favorites.includes(p.id)).map((product, index) => (
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
                          className="fill-red-500 text-red-500"
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
          ) : (
            <div className="text-center py-16">
              <Icon name="Heart" size={64} className="mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Здесь пока пусто</h3>
              <p className="text-muted-foreground mb-6">Добавь товары в избранное, чтобы быстро находить их</p>
              <Button onClick={() => setCurrentView('catalog')} className="gap-2">
                <Icon name="ShoppingBag" size={18} />
                Перейти в каталог
              </Button>
            </div>
          )}
        </section>
      )}

    </div>
  );
}
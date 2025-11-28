import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ComparisonProduct {
  name: string;
  brand: string;
  price: number;
  image: string;
  tested: boolean;
  crueltyFree?: boolean;
  vegan?: boolean;
}

interface ComparisonCardProps {
  before: ComparisonProduct;
  after: ComparisonProduct;
  category: string;
}

export default function ComparisonCard({ before, after, category }: ComparisonCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in">
      <div className="bg-muted/30 px-4 py-2 border-b">
        <p className="text-sm font-medium text-muted-foreground">{category}</p>
      </div>
      <CardContent className="p-0">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-0">
          <div className="p-6 border-r">
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-3 opacity-60">{before.image}</div>
              <h3 className="font-semibold text-base mb-1">{before.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{before.brand}</p>
              <div className="flex flex-col gap-2 mb-3 w-full">
                {before.tested && (
                  <Badge variant="destructive" className="gap-1 justify-center">
                    <Icon name="AlertCircle" size={14} />
                    Тестируется на животных
                  </Badge>
                )}
              </div>
              <p className="text-lg font-bold text-foreground/70">{before.price} ₽</p>
            </div>
          </div>

          <div className="flex items-center justify-center px-4 bg-accent/20">
            <div className="flex flex-col items-center gap-2">
              <Icon name="ArrowRight" size={32} className="text-primary" />
              <span className="text-xs font-medium text-primary">Замена</span>
            </div>
          </div>

          <div className="p-6 border-l bg-accent/10">
            <div className="flex flex-col items-center text-center">
              <div className="text-5xl mb-3">{after.image}</div>
              <h3 className="font-semibold text-base mb-1">{after.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{after.brand}</p>
              <div className="flex flex-col gap-2 mb-3 w-full">
                {after.crueltyFree && (
                  <Badge variant="secondary" className="gap-1 justify-center bg-primary/10 text-primary border-primary/20">
                    <Icon name="Check" size={14} />
                    Cruelty-Free
                  </Badge>
                )}
                {after.vegan && (
                  <Badge variant="secondary" className="gap-1 justify-center bg-secondary text-secondary-foreground">
                    🌱 Vegan
                  </Badge>
                )}
              </div>
              <p className="text-lg font-bold text-primary">{after.price} ₽</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-accent/30 border-t">
          <Button className="w-full gap-2">
            <Icon name="Info" size={18} />
            Подробнее о замене
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

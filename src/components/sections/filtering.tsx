import { ChevronDown, Filter, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type FilteringProps = {
  categories: string[];
  isLoadCategory: boolean;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setSortOrder: (sortOrder: { field: string; order: string }) => void;
};

export function Filtering({
  categories,
  isLoadCategory,
  isFilterOpen,
  setIsFilterOpen,
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  setSortOrder,
}: FilteringProps) {
  const resetFilters = () => {
    setSelectedCategory('');
    setSearch('');
    setSortOrder({ field: '', order: '' });
  };

  return (
    <div className="mb-4 flex justify-end space-x-2">
      {/* Filtering */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Products</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[200px] pl-8 md:w-[300px]"
                />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Categories</h3>
            {isLoadCategory ? (
              <p>Loading categories...</p>
            ) : (
              categories.map((category: string) => (
                <div
                  key={category}
                  className="mb-2 flex items-center space-x-2"
                >
                  <Checkbox
                    id={category}
                    checked={selectedCategory === category}
                    onCheckedChange={() =>
                      setSelectedCategory(
                        selectedCategory === category ? '' : category,
                      )
                    }
                  />
                  <Label
                    htmlFor={category}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </Label>
                </div>
              ))
            )}
          </div>
          <SheetFooter>
            <Button onClick={resetFilters} variant="outline">
              Reset
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Sort By */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Sort by <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => setSortOrder({ field: '', order: '' })}
          >
            Default
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setSortOrder({ field: 'price', order: 'asc' })}
          >
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setSortOrder({ field: 'price', order: 'desc' })}
          >
            Price: High to Low
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

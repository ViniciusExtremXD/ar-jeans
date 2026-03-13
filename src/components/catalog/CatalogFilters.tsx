import styles from './CatalogFilters.module.css';

interface Option {
  value: string;
  label: string;
}

interface Props {
  categories: Option[];
  subcategories: Option[];
  types: Option[];
  selectedCategory: string;
  selectedSubcategory: string;
  selectedType: string;
  query: string;
  totalResults: number;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onClear: () => void;
}

export function CatalogFilters({
  categories,
  subcategories,
  types,
  selectedCategory,
  selectedSubcategory,
  selectedType,
  query,
  totalResults,
  onCategoryChange,
  onSubcategoryChange,
  onTypeChange,
  onQueryChange,
  onClear,
}: Props) {
  const hasActiveFilter =
    selectedCategory !== 'all' ||
    selectedSubcategory !== 'all' ||
    selectedType !== 'all' ||
    query.trim().length > 0;

  return (
    <div className={styles.wrap}>
      <div className={styles.topRow}>
        <div>
          <p className={styles.title}>Navegue Pelo Catálogo</p>
          <p className={styles.result}>{totalResults} produto(s) encontrado(s)</p>
        </div>
        {hasActiveFilter && (
          <button type="button" className={styles.clearBtn} onClick={onClear}>
            Limpar filtros
          </button>
        )}
      </div>

      <div className={styles.controls}>
        <label className={styles.control}>
          <span>Categoria</span>
          <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="all">Todas</option>
            {categories.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.control}>
          <span>Subcategoria</span>
          <select value={selectedSubcategory} onChange={(e) => onSubcategoryChange(e.target.value)}>
            <option value="all">Todas</option>
            {subcategories.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.control}>
          <span>Tipo de peça</span>
          <select value={selectedType} onChange={(e) => onTypeChange(e.target.value)}>
            <option value="all">Todos</option>
            {types.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className={`${styles.control} ${styles.searchControl}`}>
          <span>Busca</span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Nome, referência, categoria..."
          />
        </label>
      </div>
    </div>
  );
}

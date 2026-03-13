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
  selectedAudience: string;
  onlyNew: boolean;
  query: string;
  totalResults: number;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onAudienceChange: (value: string) => void;
  onOnlyNewChange: (value: boolean) => void;
  onQueryChange: (value: string) => void;
  onClear: () => void;
}

const AUDIENCE_OPTIONS: Option[] = [
  { value: 'feminino', label: 'Feminino' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'infantil', label: 'Infantil' },
  { value: 'unissex', label: 'Unissex' },
];

export function CatalogFilters({
  categories,
  subcategories,
  types,
  selectedCategory,
  selectedSubcategory,
  selectedType,
  selectedAudience,
  onlyNew,
  query,
  totalResults,
  onCategoryChange,
  onSubcategoryChange,
  onTypeChange,
  onAudienceChange,
  onOnlyNewChange,
  onQueryChange,
  onClear,
}: Props) {
  const hasActiveFilter =
    selectedCategory !== 'all' ||
    selectedSubcategory !== 'all' ||
    selectedType !== 'all' ||
    selectedAudience !== 'all' ||
    onlyNew ||
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

      {/* Audience quick-tabs */}
      <div className={styles.audienceTabs}>
        <button
          type="button"
          className={`${styles.audienceTab} ${selectedAudience === 'all' ? styles.audienceTabActive : ''}`}
          onClick={() => onAudienceChange('all')}
        >
          Todos
        </button>
        {AUDIENCE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.audienceTab} ${selectedAudience === opt.value ? styles.audienceTabActive : ''}`}
            onClick={() => onAudienceChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
        <button
          type="button"
          className={`${styles.audienceTab} ${onlyNew ? styles.audienceTabNew : ''}`}
          onClick={() => onOnlyNewChange(!onlyNew)}
        >
          🆕 Novidades
        </button>
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
            placeholder="Ex: calça flare, bermuda, jaqueta..."
          />
        </label>
      </div>
    </div>
  );
}

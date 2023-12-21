import {memo, useCallback, useMemo} from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';


function CatalogFilter() {

  const store = useStore();
  const { lang , t } = useTranslate();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categories: state.categories.list,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Фильтр по категории
    onCategory: useCallback(category => store.actions.catalog.setParams({
      category,
      page: 1
    }), [store]),
  };

  const options = {
    // Варианты сортировок
    sort: useMemo(() => ([
      {value: 'order', title: t('filter.categories.order')},
      {value: 'title.ru', title: t('filter.categories.title')},
      {value: '-price', title: t('filter.categories.price')},
      {value: 'edition', title: t('filter.categories.edition')},
    ]), [lang]),
    // Категории для фильтра
    categories: useMemo(() => ([
      {value: '', title: t('filter.categories.all')},
      ...treeToList(listToTree(select.categories), (item, level) => (
        {value: item._id, title: '- '.repeat(level) + item.title}
      ))
    ]), [select.categories]),
  };

  return (
    <SideLayout padding='medium'>
      <Select options={options.categories} value={select.category} onChange={callbacks.onCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={t('filter.search')}
            delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);

import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appStyles, setAppStyles] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': appStyles.fontFamilyOption.value,
					'--font-size': appStyles.fontSizeOption.value,
					'--font-color': appStyles.fontColor.value,
					'--container-width': appStyles.contentWidth.value,
					'--bg-color': appStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setAppStyles={setAppStyles} appStyles={appStyles} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

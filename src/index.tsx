import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { AppStylesType, defaultAppStyles } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appStyles, setAppStyles] = useState<AppStylesType>(defaultAppStyles);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const handleOverlayClick = () => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
		}
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appStyles.fontFamily.value,
					'--font-size': appStyles.fontSize.value,
					'--font-color': appStyles.fontColor.value,
					'--container-width': appStyles.containerWidth.value,
					'--bg-color': appStyles.bgColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				setAppStyles={setAppStyles}
				appStyles={appStyles}
				isMenuOpen={isMenuOpen}
				setIsMenuOpen={setIsMenuOpen}
			/>
			<Article onClick={handleOverlayClick} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

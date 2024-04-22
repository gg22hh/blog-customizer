import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import { useOutsideClickClose } from 'src/hooks/useOutsideClickClose';
import clsx from 'clsx';

type ArticleParamsFormType = {
	setAppStyles: ({}: ArticleStateType) => void;
	appStyles: ArticleStateType;
};

export const ArticleParamsForm = ({
	setAppStyles,
	appStyles,
}: ArticleParamsFormType) => {
	const [selectedStyles, setSelectedStyles] = useState<ArticleStateType>({
		...appStyles,
	});
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
	});

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppStyles(selectedStyles);
		setIsMenuOpen(false);
	};

	const handleResetForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppStyles(defaultArticleState);
		setSelectedStyles(defaultArticleState);
		setIsMenuOpen(false);
	};

	return (
		<>
			<ArrowButton
				onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
				isMenuOpen={isMenuOpen}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					onSubmit={handleSubmitForm}
					className={styles.form}
					onReset={handleResetForm}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedStyles.fontFamilyOption}
						title='Шрифт'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						name='Font Size'
						options={fontSizeOptions}
						selected={selectedStyles.fontSizeOption}
						title='Размер Шрифта'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, fontSizeOption: option })
						}
					/>
					<Select
						options={fontColors}
						selected={selectedStyles.fontColor}
						title='Цвет Шрифта'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, fontColor: option })
						}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectedStyles.backgroundColor}
						title='Цвет Фона'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, backgroundColor: option })
						}
					/>
					<Select
						options={contentWidthArr}
						selected={selectedStyles.contentWidth}
						title='Ширина Контента'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

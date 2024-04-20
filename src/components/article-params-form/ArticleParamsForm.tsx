import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { Select } from '../select';
import {
	AppStylesType,
	backgroundColors,
	contentWidthArr,
	defaultAppStyles,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';

type ArticleParamsFormType = {
	setAppStyles: ({}: AppStylesType) => void;
	appStyles: AppStylesType;
	isMenuOpen: boolean;
	setIsMenuOpen: (value: boolean) => void;
};

export const ArticleParamsForm = ({
	setAppStyles,
	appStyles,
	isMenuOpen,
	setIsMenuOpen,
}: ArticleParamsFormType) => {
	const [selectedStyles, setSelectedStyles] = useState<AppStylesType>({
		...appStyles,
	});

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppStyles(selectedStyles);
		setIsMenuOpen(false);
	};

	const handleResetForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppStyles(defaultAppStyles);
		setSelectedStyles(defaultAppStyles);
		setIsMenuOpen(false);
	};

	return (
		<>
			<ArrowButton onClick={() => setIsMenuOpen(!isMenuOpen)} />
			<aside
				className={`${styles.container} ${
					isMenuOpen && styles.container_open
				}`}>
				<form
					onSubmit={(e) => handleSubmitForm(e)}
					className={styles.form}
					onReset={(e) => handleResetForm(e)}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectedStyles.fontFamily}
						title='Шрифт'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, fontFamily: option })
						}
					/>
					<RadioGroup
						name='Font Size'
						options={fontSizeOptions}
						selected={selectedStyles.fontSize}
						title='Размер Шрифта'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, fontSize: option })
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
						selected={selectedStyles.bgColor}
						title='Цвет Фона'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, bgColor: option })
						}
					/>
					<Select
						options={contentWidthArr}
						selected={selectedStyles.containerWidth}
						title='Ширина Контента'
						onChange={(option) =>
							setSelectedStyles({ ...selectedStyles, containerWidth: option })
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

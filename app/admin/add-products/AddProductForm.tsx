'use client';

import Heading from '@/app/components/Heading';
import Input from '@/app/components/inputs/Input';
import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import TextArea from '@/app/components/inputs/TextArea';
import CustomCheckBox from '@/app/components/inputs/CustomCheckBox';
import { categories } from '@/app/utils/Categories';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import { colors } from '@/app/utils/colors';

export type ImageType = {
	color: string;
	colorCode: string;
	image: File | null;
};

export type UploadedImageType = {
	color: string;
	colorCode: string;
	image: string;
};

const AddProductForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors }
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			describe: '',
			brand: '',
			category: '',
			inStorck: false,
			images: [],
			price: ''
		}
	});

	const category = watch('category');
	const setCustomValue = (id: string, value: string) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true
		});
	};
	return (
		<>
			<Heading title='Add a Product' center />
			<Input
				id='name'
				label='Name'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='price'
				label='Price'
				disabled={isLoading}
				register={register}
				errors={errors}
				type='number'
				required
			/>
			<Input
				id='brand'
				label='Brand'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<TextArea
				id='description'
				label='Description'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<CustomCheckBox
				id='inStock'
				label='In Stock'
				disabled={isLoading}
				register={register}
			/>
			<div className='w-full font-medium'>
				<div className='mb-2 font-semibold'>Select a Category</div>
				<div className='grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto'>
					{categories.map((item) => {
						if (item.label === 'All') return null;
						<div key={category.label} className='col-span'>
							<CategoryInput
								label={item.label}
								icon={item.icon}
								selected={category === item.label}
								onClick={(value: string) => setCustomValue('category', value)}
							/>
						</div>;
					})}
				</div>
			</div>
			<div className='w-full flex flex-col flex-wrap gap-4'>
				<div>
					<div className='font-bold'>
						Select the available product colors and upload their images.
					</div>
					<div className='text-sm'>
						You must upload an image for each of the color selected otherwise
						your color selection will be ignored
					</div>
				</div>
				<div className='grid, grid-cols-2 gap-3'></div>
			</div>
		</>
	);
};
export default AddProductForm;

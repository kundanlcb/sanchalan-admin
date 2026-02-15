import type { FeeCategoryDto, FeeStructureDto, FeeStructureItemDto } from '../../../api/models';

export type FeeCategory = FeeCategoryDto & { id: number };
export type CreateFeeCategoryRequest = FeeCategoryDto;

export type FeeStructure = FeeStructureDto & { id: number };
export type FeeStructureItem = FeeStructureItemDto;
export type CreateFeeStructureRequest = FeeStructureDto;

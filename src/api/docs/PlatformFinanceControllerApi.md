# PlatformFinanceControllerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createCategory**](#createcategory) | **POST** /api/platform/v1/schools/{schoolId}/finance/categories | |
|[**createStructure**](#createstructure) | **POST** /api/platform/v1/schools/{schoolId}/finance/structures | |
|[**generateInvoices**](#generateinvoices) | **POST** /api/platform/v1/schools/{schoolId}/finance/invoices/generate | |
|[**getCategories**](#getcategories) | **GET** /api/platform/v1/schools/{schoolId}/finance/categories | |
|[**getStructures**](#getstructures) | **GET** /api/platform/v1/schools/{schoolId}/finance/structures | |

# **createCategory**
> FeeCategoryDto createCategory(feeCategoryDto)


### Example

```typescript
import {
    PlatformFinanceControllerApi,
    Configuration,
    FeeCategoryDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PlatformFinanceControllerApi(configuration);

let schoolId: string; // (default to undefined)
let feeCategoryDto: FeeCategoryDto; //

const { status, data } = await apiInstance.createCategory(
    schoolId,
    feeCategoryDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **feeCategoryDto** | **FeeCategoryDto**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**FeeCategoryDto**

### Authorization

[bearer-jwt](../README.md#bearer-jwt)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createStructure**
> FeeStructureDto createStructure(feeStructureDto)


### Example

```typescript
import {
    PlatformFinanceControllerApi,
    Configuration,
    FeeStructureDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PlatformFinanceControllerApi(configuration);

let schoolId: string; // (default to undefined)
let feeStructureDto: FeeStructureDto; //

const { status, data } = await apiInstance.createStructure(
    schoolId,
    feeStructureDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **feeStructureDto** | **FeeStructureDto**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**FeeStructureDto**

### Authorization

[bearer-jwt](../README.md#bearer-jwt)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **generateInvoices**
> generateInvoices()


### Example

```typescript
import {
    PlatformFinanceControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlatformFinanceControllerApi(configuration);

let schoolId: string; // (default to undefined)

const { status, data } = await apiInstance.generateInvoices(
    schoolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer-jwt](../README.md#bearer-jwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCategories**
> Array<FeeCategoryDto> getCategories()


### Example

```typescript
import {
    PlatformFinanceControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlatformFinanceControllerApi(configuration);

let schoolId: string; // (default to undefined)

const { status, data } = await apiInstance.getCategories(
    schoolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**Array<FeeCategoryDto>**

### Authorization

[bearer-jwt](../README.md#bearer-jwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getStructures**
> Array<FeeStructureDto> getStructures()


### Example

```typescript
import {
    PlatformFinanceControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlatformFinanceControllerApi(configuration);

let schoolId: string; // (default to undefined)

const { status, data } = await apiInstance.getStructures(
    schoolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**Array<FeeStructureDto>**

### Authorization

[bearer-jwt](../README.md#bearer-jwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


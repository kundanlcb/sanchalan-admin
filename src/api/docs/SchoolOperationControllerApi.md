# SchoolOperationControllerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getOperationConfig**](#getoperationconfig) | **GET** /api/platform/v1/schools/{schoolId}/operations | |
|[**updateOperationConfig**](#updateoperationconfig) | **POST** /api/platform/v1/schools/{schoolId}/operations | |

# **getOperationConfig**
> SchoolOperationConfig getOperationConfig()


### Example

```typescript
import {
    SchoolOperationControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SchoolOperationControllerApi(configuration);

let schoolId: string; // (default to undefined)

const { status, data } = await apiInstance.getOperationConfig(
    schoolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**SchoolOperationConfig**

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

# **updateOperationConfig**
> SchoolOperationConfig updateOperationConfig(schoolOperationConfig)


### Example

```typescript
import {
    SchoolOperationControllerApi,
    Configuration,
    SchoolOperationConfig
} from './api';

const configuration = new Configuration();
const apiInstance = new SchoolOperationControllerApi(configuration);

let schoolId: string; // (default to undefined)
let schoolOperationConfig: SchoolOperationConfig; //

const { status, data } = await apiInstance.updateOperationConfig(
    schoolId,
    schoolOperationConfig
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolOperationConfig** | **SchoolOperationConfig**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**SchoolOperationConfig**

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


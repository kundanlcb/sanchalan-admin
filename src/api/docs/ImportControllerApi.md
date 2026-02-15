# ImportControllerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**uploadImport**](#uploadimport) | **POST** /api/platform/v1/schools/{schoolId}/imports | |

# **uploadImport**
> ImportJob uploadImport()


### Example

```typescript
import {
    ImportControllerApi,
    Configuration,
    UploadImportRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ImportControllerApi(configuration);

let schoolId: string; // (default to undefined)
let type: 'STUDENT' | 'TEACHER' | 'PARENT'; // (default to undefined)
let uploadImportRequest: UploadImportRequest; // (optional)

const { status, data } = await apiInstance.uploadImport(
    schoolId,
    type,
    uploadImportRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **uploadImportRequest** | **UploadImportRequest**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|
| **type** | [**&#39;STUDENT&#39; | &#39;TEACHER&#39; | &#39;PARENT&#39;**]**Array<&#39;STUDENT&#39; &#124; &#39;TEACHER&#39; &#124; &#39;PARENT&#39;>** |  | defaults to undefined|


### Return type

**ImportJob**

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


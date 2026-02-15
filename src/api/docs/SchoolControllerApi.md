# SchoolControllerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**bootstrapAdmin**](#bootstrapadmin) | **POST** /api/platform/v1/schools/{schoolId}/bootstrap-admin | |
|[**createSchool**](#createschool) | **POST** /api/platform/v1/schools | |
|[**getAllSchools**](#getallschools) | **GET** /api/platform/v1/schools | |
|[**getSchoolById**](#getschoolbyid) | **GET** /api/platform/v1/schools/{schoolId} | |
|[**transitionStatus**](#transitionstatus) | **POST** /api/platform/v1/schools/{schoolId}/status-transition | |

# **bootstrapAdmin**
> User bootstrapAdmin(bootstrapAdminRequest)


### Example

```typescript
import {
    SchoolControllerApi,
    Configuration,
    BootstrapAdminRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new SchoolControllerApi(configuration);

let schoolId: string; // (default to undefined)
let bootstrapAdminRequest: BootstrapAdminRequest; //

const { status, data } = await apiInstance.bootstrapAdmin(
    schoolId,
    bootstrapAdminRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bootstrapAdminRequest** | **BootstrapAdminRequest**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**User**

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

# **createSchool**
> School createSchool(school)


### Example

```typescript
import {
    SchoolControllerApi,
    Configuration,
    School
} from './api';

const configuration = new Configuration();
const apiInstance = new SchoolControllerApi(configuration);

let school: School; //

const { status, data } = await apiInstance.createSchool(
    school
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **school** | **School**|  | |


### Return type

**School**

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

# **getAllSchools**
> Array<School> getAllSchools()


### Example

```typescript
import {
    SchoolControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SchoolControllerApi(configuration);

const { status, data } = await apiInstance.getAllSchools();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<School>**

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

# **getSchoolById**
> School getSchoolById()


### Example

```typescript
import {
    SchoolControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SchoolControllerApi(configuration);

let schoolId: string; // (default to undefined)

const { status, data } = await apiInstance.getSchoolById(
    schoolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**School**

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

# **transitionStatus**
> School transitionStatus(body)


### Example

```typescript
import {
    SchoolControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SchoolControllerApi(configuration);

let schoolId: string; // (default to undefined)
let body: string; //

const { status, data } = await apiInstance.transitionStatus(
    schoolId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **string**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**School**

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


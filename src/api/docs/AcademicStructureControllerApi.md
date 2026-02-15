# AcademicStructureControllerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createClass**](#createclass) | **POST** /api/platform/v1/schools/{schoolId}/academic/classes | |
|[**createSection**](#createsection) | **POST** /api/platform/v1/schools/{schoolId}/academic/classes/{classId}/sections | |
|[**createSubject**](#createsubject) | **POST** /api/platform/v1/schools/{schoolId}/academic/subjects | |
|[**createYear**](#createyear) | **POST** /api/platform/v1/schools/{schoolId}/academic/years | |
|[**getClasses**](#getclasses) | **GET** /api/platform/v1/schools/{schoolId}/academic/classes | |
|[**getSections**](#getsections) | **GET** /api/platform/v1/schools/{schoolId}/academic/classes/{classId}/sections | |
|[**getSubjects**](#getsubjects) | **GET** /api/platform/v1/schools/{schoolId}/academic/subjects | |
|[**getYears**](#getyears) | **GET** /api/platform/v1/schools/{schoolId}/academic/years | |

# **createClass**
> SchoolClass createClass(schoolClass)


### Example

```typescript
import {
    AcademicStructureControllerApi,
    Configuration,
    SchoolClass
} from './api';

const configuration = new Configuration();
const apiInstance = new AcademicStructureControllerApi(configuration);

let schoolId: string; // (default to undefined)
let schoolClass: SchoolClass; //

const { status, data } = await apiInstance.createClass(
    schoolId,
    schoolClass
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolClass** | **SchoolClass**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**SchoolClass**

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

# **createSection**
> Section createSection(section)


### Example

```typescript
import {
    AcademicStructureControllerApi,
    Configuration,
    Section
} from './api';

const configuration = new Configuration();
const apiInstance = new AcademicStructureControllerApi(configuration);

let schoolId: string; // (default to undefined)
let classId: number; // (default to undefined)
let section: Section; //

const { status, data } = await apiInstance.createSection(
    schoolId,
    classId,
    section
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **section** | **Section**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|
| **classId** | [**number**] |  | defaults to undefined|


### Return type

**Section**

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

# **createSubject**
> Subject createSubject(subject)


### Example

```typescript
import {
    AcademicStructureControllerApi,
    Configuration,
    Subject
} from './api';

const configuration = new Configuration();
const apiInstance = new AcademicStructureControllerApi(configuration);

let schoolId: string; // (default to undefined)
let subject: Subject; //

const { status, data } = await apiInstance.createSubject(
    schoolId,
    subject
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subject** | **Subject**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**Subject**

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

# **createYear**
> AcademicYear createYear(academicYear)


### Example

```typescript
import {
    AcademicStructureControllerApi,
    Configuration,
    AcademicYear
} from './api';

const configuration = new Configuration();
const apiInstance = new AcademicStructureControllerApi(configuration);

let schoolId: string; // (default to undefined)
let academicYear: AcademicYear; //

const { status, data } = await apiInstance.createYear(
    schoolId,
    academicYear
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **academicYear** | **AcademicYear**|  | |
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**AcademicYear**

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

# **getClasses**
> Array<SchoolClass> getClasses()


### Example

```typescript
import {
    AcademicStructureControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AcademicStructureControllerApi(configuration);

let schoolId: string; // (default to undefined)

const { status, data } = await apiInstance.getClasses(
    schoolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**Array<SchoolClass>**

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

# **getSections**
> Array<Section> getSections()


### Example

```typescript
import {
    AcademicStructureControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AcademicStructureControllerApi(configuration);

let schoolId: string; // (default to undefined)
let classId: number; // (default to undefined)

const { status, data } = await apiInstance.getSections(
    schoolId,
    classId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|
| **classId** | [**number**] |  | defaults to undefined|


### Return type

**Array<Section>**

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

# **getSubjects**
> Array<Subject> getSubjects()


### Example

```typescript
import {
    AcademicStructureControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AcademicStructureControllerApi(configuration);

let schoolId: string; // (default to undefined)

const { status, data } = await apiInstance.getSubjects(
    schoolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**Array<Subject>**

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

# **getYears**
> Array<AcademicYear> getYears()


### Example

```typescript
import {
    AcademicStructureControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AcademicStructureControllerApi(configuration);

let schoolId: string; // (default to undefined)

const { status, data } = await apiInstance.getYears(
    schoolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**Array<AcademicYear>**

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


# QuestDTO


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**title** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**type** | **string** |  | [optional] [default to undefined]
**actionType** | **string** |  | [optional] [default to undefined]
**answerHint** | **string** |  | [optional] [default to undefined]
**reward** | [**RewardDto**](RewardDto.md) |  | [optional] [default to undefined]
**quizContent** | [**QuizContentDTO**](QuizContentDTO.md) |  | [optional] [default to undefined]

## Example

```typescript
import { QuestDTO } from './api';

const instance: QuestDTO = {
    id,
    title,
    description,
    type,
    actionType,
    answerHint,
    reward,
    quizContent,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

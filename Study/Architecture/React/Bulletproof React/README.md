# Bulletproof React

> 공부용 일부 요약
>
> https://github.com/alan2207/bulletproof-react

[TOC]



## Intro

작성자의 경험에 의거해 확장이 쉽고 ecosystem 내의 최고의 도구들을 사용하는 리액트 구조

### Bulletproof?

- 시작하기 쉽고
- 이해와 유지가 간단하며
- 상황에 맞는 툴을 사용하고
- 애플리케이션의 다른 부분마다 명확한 경계를 가지며
- 일 처리에 대해 팀원 모두가 같은 지식을 공유하고
- 보안과 성능을 갖추고
- 코드와 팀 크기에 맞는 확장성을 가지며
- 최대한 빠르게 문제를 파악할 수 있는

템플릿/보일러플레이트가 아닌 가이드임!

## Application Overview

- Vite react-ts 템플릿
  - 번들링, 트랜스파일링 등의 복잡한 셋업 필요 없음
  - 메타-프레임워크에 한정된 것들을 강제하지 않아 간단함
- Next.js || Remix

예시 애플리케이션은 간단함: 유저는 다른 유저들이 참여할 수 있는 팀을 만들 수 있고 팀은 토픽들에 대한 토론을 시작할 수 있음

생략

## Project Standards

코드 품질, 일관성, 확장성을 유지하기 위해서는 project standard를 강제하는 것이 필요함. 리액트 앱에서는 BP를 만들고 사용하는 것으로 코드베이스를 깔끔하게 정돈되어 쉽게 유지보수할 수 있게 해줌.

- ESLint
- Prettier
- TypeScript
  - https://react-typescript-cheatsheet.netlify.app/
- Husky
  - 깃 훅 관련; 푸시 전 린팅, 포매팅, 타입 체크 등 여러 태스크를 할 수 있게끔 해 줌
- Absolute imports
  - `@ -> src`
- File naming conventions
  - ESLint 설정을 통해 강제할 수 있음

## Project Structure

```
src
|
+-- app               # application layer containing:
|   |
|   +-- routes        # application routes / can also be called pages
    +-- app.tsx       # main application component
    +-- app-provider  # application provider that wraps the entire application with global providers
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- test              # test utilities and mocks
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions
```

대부분의 코드는 ‘feature’ 폴더에 들어간다. 각각의 ‘feature’ 폴더에는 해당 기능만을 담당하는 코드만 있도록 한다. 이런 접근은 기능 코드와 공유 코드가 섞이는 것을 막는 데 도움을 준다.

- 루트(src) 레벨의 폴더는 기본적으로 /app 으로 수렴한다

- /app 을 제외한 폴더는 기본적으로 /shared에 들어있는 느낌

  - 당연히 기호에 맞게 수정해서 쓰면 될 것 같다

- 또한 /features 를 제외한 폴더들은 /features 에서도 사용될 수 있고,
  /features 또한 /app 으로 수렴한다

  - /features 에는 해당 기능만 수행하는 코드
    나머지에는 여러 곳에서 쓰일 수 있는 코드들
    그리고 이 모든 것들이 모여 페이지를 구성하는 /app 으로 이해하자

    ![Unidirectional Codebase](https://github.com/alan2207/bulletproof-react/raw/master/docs/assets/unidirectional-codebase.png)

### 자세히 살펴보기

#### /app

```
app
|
+-- routes
|   |
|   +-- app
|   +-- auth
|   +-- index.tsx
+-- index.tsx
+-- main-provider.tsx
```

pages와 비슷한 routes 폴더 내부에는 기능별 페이지가 두 폴더로 나뉘어져 있음. 
각 페이지 파일은 아래와 같은 형식

```jsx
import { QueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { LoaderFunctionArgs, useParams } from 'react-router-dom';

import { ContentLayout } from '@/components/layouts';
import { Spinner } from '@/components/ui/spinner';
import { getCommentsQueryOptions } from '@/features/comments/api/get-comments';
import { Comments } from '@/features/comments/components/comments';
import {
  useDiscussion,
  getDiscussionQueryOptions,
} from '@/features/discussions/api/get-discussion';
import { DiscussionView } from '@/features/discussions/components/discussion-view';

export const discussionLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const discussionId = params.discussionId as string;

    const discussionQuery = getDiscussionQueryOptions(discussionId);
    const commentsQuery = getCommentsQueryOptions(discussionId);

    const promises = [
      queryClient.getQueryData(discussionQuery.queryKey) ??
        (await queryClient.fetchQuery(discussionQuery)),
      queryClient.getQueryData(commentsQuery.queryKey) ??
        (await queryClient.fetchQuery(commentsQuery)),
    ] as const;

    const [discussion, comments] = await Promise.all(promises);

    return {
      discussion,
      comments,
    };
  };

export const DiscussionRoute = () => {
  const params = useParams();
  const discussionId = params.discussionId as string;
  const discussionQuery = useDiscussion({
    discussionId,
  });

  if (discussionQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!discussionQuery.data) return null;

  return (
    <>
      <ContentLayout title={discussionQuery.data.title}>
        <DiscussionView discussionId={discussionId} />
        <div className="mt-8">
          <ErrorBoundary
            fallback={
              <div>Failed to load comments. Try to refresh the page.</div>
            }
          >
            <Comments discussionId={discussionId} />
          </ErrorBoundary>
        </div>
      </ContentLayout>
    </>
  );
};
```

대부분의 ui가 feature에 정의된 컴포넌트이며, feature 폴더의 구조는 아래에서

#### /feature

```
src/features/awesome-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types used within the feature
|
+-- utils       # utility functions for a specific feature
```

- 문서에서 설명하는 feature 폴더의 구조

```
@/features/discussions
|
+-- api
+-- components
```

- 레포 내의 구조 (api, components 외 존재 x)

```jsx
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization, ROLES } from '@/lib/authorization';

import {
  createDiscussionInputSchema,
  useCreateDiscussion,
} from '../api/create-discussion';

export const CreateDiscussion = () => {
  const { addNotification } = useNotifications();
  const createDiscussionMutation = useCreateDiscussion({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Discussion Created',
        });
      },
    },
  });

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDrawer
        isDone={createDiscussionMutation.isSuccess}
        triggerButton={
          <Button size="sm" icon={<Plus className="size-4" />}>
            Create Discussion
          </Button>
        }
        title="Create Discussion"
        submitButton={
          <Button
            form="create-discussion"
            type="submit"
            size="sm"
            isLoading={createDiscussionMutation.isPending}
          >
            Submit
          </Button>
        }
      >
        <Form
          id="create-discussion"
          onSubmit={(values) => {
            createDiscussionMutation.mutate({ data: values });
          }}
          schema={createDiscussionInputSchema}
        >
          {({ register, formState }) => (
            <>
              <Input
                label="Title"
                error={formState.errors['title']}
                registration={register('title')}
              />

              <Textarea
                label="Body"
                error={formState.errors['body']}
                registration={register('body')}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
```

`@/features/discussions/components/create-discussion.tsx`
공통 ui 컴포넌트 + 공통 라이브러리 + 기능 한정 api 로 구성되어 있음

또한 과거에는 barrel export (index.ts에서 묶어서 export 하면 import 경로가 한 단계 단축됨) 가 권장되었지만, 비트 성능 이슈 등으로 풀 경로에서 직접 import 하는 것을 권장

또한 feature 에서 다른 feature 를 import 하는 것은 좋은 생각이 아닐 수 있음
이럴 때에는 애플리케이션 레벨에서 다른 feature 들을 compose 하면 각각의 기능들을 독립적으로 만들 수 있음

- cross-feature import 를 ESLint 룰로 방지할 수 있음
- 적합한 예시인지 모르겠지만, 자세히 살펴보기 - /app 의 예시를 보면, comments 따로 discussions 따로인 부분을 확인할 수 있음


# INP, Interaction to Next Paint

> 반응성(상호작용), **200ms**

- 의미
  - 유저와 페이지의 상호작용(클릭 등) 시간을 기록하여 가장 길었던 시간을 뜻함
    - 실제 상호작용의 목적(비동기 작업 이후의 UI 업데이트 등)이 달성되는 시간을 측정하는 목적이 아니라, 유저가 상호작용을 했을 때 시각 피드백을 주기까지의 시간을 측정하는 목적
    - 가장 오래 걸린 상호작용 시간이 INP로 보고되지만, 매 50회의 상호작용 시간 중 가장 길었던 하나는 제외하고 계산
    - 상호작용(interaction): 유저의 제스쳐에 따라 발생한 이벤트 핸들러 그룹. e.g.) `tap` → `pointerup, pointerdown, click`.

![life of an interaction](https://web.dev/static/articles/inp/image/a-diagram-depicting-inte-d2bec16a5952.svg)

life of an interaction

### FID와 다른 점?

FID(first input delay)는 페이지의 첫 상호작용의 지연시간만 측정 ↔ INP는 사이트의 전체적인 반응성을 측정
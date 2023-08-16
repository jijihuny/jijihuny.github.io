---
title: "Dependency Injection이란?"
# excerpt: ""

categories:
    - study
tags:

toc: true

date: 2023-08-13
last_modified_at: 2023-08-17

---

# Dependency Injection이란?

<br>

오늘은 Dependency Injection([의존성 주입](https://en.wikipedia.org/wiki/Dependency_injection), 이하 DI)을 간단히 다루어보고, Dependency Injection Container를 구현해보는 것까지 진행해보도록 하겠습니다.

우선 Dependency(의존성)이 무엇인지 살펴보도록 해봅시다.

```typescript

    class A {
        b: B
    }

    class B { ... }

```

위와 같이 되어있을 때, A는 B에게 의존한다고 표현합니다.

A의 상태가 B의 상태에 의해 결정되기 때문이죠.

이제 DI은 무엇일까요?

우선 간단히 5살 아기에 빗대어 의존성 주입에 대한 얘기를 해보도록 합시다.

---

 어린 아이는 이제 막 걸음마를 떼고, 스스로의 삶을 개척하기 시작합니다.
 하지만 아직 미숙한 아이가 스스로 냉장고 문을 열어 무언갈 꺼내먹는다면, 기특하긴 하겠지만 걱정할 일이 많지요?

 아이가 냉장고 문을 열어둔 채로 놔둘 수도 있고, 꺼내선 안될 것을 꺼낼 지도 모릅니다. 어쩌면 냉장고에 없는 것을 찾고 있을지도 모르지요.

 아직 어린 아이는 '무언가 마시고 싶어!'라고 느끼는 것만으로 충분합니다. 엄마 아빠가 알아서 적절한 마실 것을 찾아다줄 것이고, 아이는 그저 앉아서 쥐어준 음료를 마시기만 하면 됩니다.
 
 ---

 어떤 것을 말하고자 하는지 이해가 가시나요?

 위에 글은 사실 어린 아이를 하나의 객체에 빗대고 있습니다. 부모님은 프레임워크일 수도, 혹은 간단히 아이 객체를 Has-A 관계로 보유하고 있는 상위 객체일 수도 있습니다.

 하여튼, 위의 글에서 말하는 바는 객체 그 자신이 의존관계를 직접 결정짓지 않는다는 것입니다. 그것이 바로 DI를 말하는 것이지요.

 코드를 통해 보는 것이 아마 훨씬 직관적일 겁니다.

 ```typescript
 
    class A {
        b: B;

        constructor() {
            this.b = new B();
        }
    }
 
    class B { ... }

    const a = new A();

 ```

 ```typescript

    class A {
        ...

        constructor(b: B) {
            this.b = b;
        }
        
        ...
    }

    ...

    const a = new A(new B());

 ```

 위의 두 코드의 차이점이 눈에 들어오실 겁니다.

 전자의 경우 A는 B를 내부에서 직접 생성합니다.

 의존 관계를 스스로 생성하는 것이죠.

 만약 추후 의존관계를 수정하고 싶다면, A의 생성자를 직접 수정해야 할 것 입니다.

 후자의 경우 A는 B와의 관계를 결정짓지 않습니다.

 A가 의존할 B는 외부에서 결정되어 _주입_ 되고 있습니다.

 바로 이것이 DI 그 자체입니다.

 객체 그 자신은 의존관게를 결정짓지 않습니다.

 그저 그 의존관계와 함께 무엇을 해야할 지만 알고 있는 것이죠.

 전자의 경우 객체 그 자신이 어떤 의존관계를 맺을 지 이미 결정되어있기 때문에, 이 관계를 수정하는 방법은(예컨데, B의 상태를 달리하여 A를 생성하고 싶다면) A 생성자 자체를 수정하는 방법밖에 없을 겁니다.

 DI를 사용한다면, 적어도 A는 수정할 필요가 없습니다. 의존관계를 어떻게 선택할 지는, 완전히 외부에 위임되었기 때문입니다.

 물론 이것만으로 DI를 설명한다면 조금 부실할 지도 모릅니다.
 
 그냥 단순히 생성자를 통해 사용할 객체를 받아오는 것일 뿐이니까요.
 B를 싱글톤으로 유지할 수 있겠다 정도만 생각나는 것 같습니다.

 조금 더 나아가 생각해보도록 합시다. 

 이제 좀 더 예제를 구체화해보도록 합시다.

 인터페이스(Interface)의 개념을 사용해볼 겁니다.

 ```typescript

 class Barista {

    recipe: Recipe;

    constructor(recipe: Recipe) {
        this.recipe = recipe;
    }

    makeCoffee(): Coffee {
        return this.recipe.getCoffee();
    }

 }

 class Coffee {}

 interface Recipe {
    getCoffee(): Coffee;
 }
 
 class LatteRecipe implements Recipe {...}

 class ColdbrewRecipe implements Recipe {...}

 const latteBarista = new Barista(new LatteRecipe());

 const coldbrewBarista = new Barista(new ColdbrewRecipe());

 ```

 이제 좀 더 DI의 효과가 보이는 것 같습니다.

 Recipe라는 인터페이스가 정의되었습니다. Recipe는 getCoffee라는 명세를 통해 자신이 어떤 커피를 제공할 것임을 말해줍니다.

 이제 Barista는 자신이 할 행동을 makeCoffee로 정의했습니다.
 무엇일진 몰라도 어떤 커피를 내놓을 겁니다.

 어떤 커피를 내놓을진 어떻게 알 수 있을까요?

 그것은 Barista가 실제로 생성되어야만 알 수 있습니다.

 그 전까지는 단지 Recipe의 명세(getCoffee)에 의존하여 자신의 행동(makeCoffee)를 규정지는 것 뿐입니다.

 ```typescript
 
 const latteBarista = new Barista(new LatteRecipe());

 const coldbrewBarista = new Barista(new ColdbrewRecipe());

 ```
 에서야 진짜 바리스타가 생성됩니다. 자신이 만들 커피에 대한 레시피를 주입받으면서 말이죠.

 만약 Barista 스스로가 직접 레시피를 결정짓는 시나리오를 생각해봅시다.

 아무쪼록 여러가지 방법이 있을 겁니다.

 각 레시피마다 일일히 새로운 바리스타 클래스를 만들 수도 있고,

 생성자에서 switch-case를 이용해 레시피를 결정지을 수도 있겠네요.
 그러나 이것은 결국 외부에서 의존성을 결정짓기 때문에 큰 의미가 없습니다.

 새로운 레시피가 생성된다면, 생성자를 수정해야 하겠죠.

 결국 DI를 통해 Barista는 이제 근본 로직에 대한 수정, 추가를 위한 것이 아니라면, 더이상 바뀔 것이 없습니다.

 새로운 레시피가 생성되었다면, 새로운 레시피를 주입시켜 바리스타를 생성하면 그뿐입니다..

 바리스타는 이제 음료를 만드는 과정에만 집중하면 될 것 입니다.

 어떤 음료를 만들지에 대해선 레시피에 책임을 맡기면 되지요.

 대충 DI가 어떤 개념인지 감이 오시나요?

 이제 결론적으로 DI가 어떤 점에서 좋고 나쁜지 한 번 생각해보도록 하겠습니다.

 아래는 [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection#Disadvantages)를 참고하여 정리한 장단점입니다.

 ## 장점

 - 클래스와 의존성 간의 결합도 하락

 Barista의 정의에서 Recipe의 구현체가 어떤 동작을 하는지는 신경쓸 필요가 없었습니다.

 getCoffee가 Coffee라는 결과물을 생산한다는 것만 알면 충분했지요.

 class는 의존하는 객체들이 실제로 어떻게 구현되는지 알 필요가 없기 때문에, 프로그램의 재사용성이 향상되고 테스트와 유지보수가 용이해집니다.

 - Boilerplate code 예방

 Boilerplate code란 불필요하게 반복되는 코드를 대충 의미합니다.

 - 동시적 개발을 가능하게 한다.

 이를테면, 두 개발자는 서로 다른 별개의 클래스들을 개발하면서도 상대방의 api를 서로 사용하면서 개발할 수도 있습니다.

 인터페이스만 사전에 정의하고 나면, 구현체가 아직 다 개발되지 않아도 인터페이스에 기반하여 각자의 코드를 구현하면 되죠.

 물론 이런 경우 생성자를 통한 의존성 주입은 어려울 겁니다.

 Cyclic(Circular라고도 합니다.) Dependency를 발생시키기 때문입니다.

## 단점
- configuration의 필요성.
 위에선 직접 생성할 때 의존성을 주입시켜줬습니다만, 실제론 프레임워크(DI container)가 자동적으로 의존성을 주입해주는 경우가 많습니다.

 이러한 경우 Default 혹은 어떤 상황에서 어떤 녀석을 주입시킬지에 대한 설정이 필요하겠죠?

 간단한 어플리케이션 레벨에선 오히려 프로그램 복잡도를 높이고 쓸 때 없이 복잡한 구조를 만들어버릴 것 입니다.

 다음 기술할 단점도 이와 이어집니다.

- 동작 과정을 추적하기 힘들다.

 모든 의존성은 결국 interface와 이어질 겁니다.

 그런데 interface는 실제 동작에 대한 정보를 전혀 담고 있지 않습니다.

 아무리 잘 만들어진 api라 하더라도 대부분 내부 동작에선 많은 부수효과도 발생하기 마련이고, 무언가 응용을 위해서도 내부동장을 알아야 할 필요가 생기기도 합니다.

 그런데 DI를 이용한 개발은 그 모토 자체가 인터페이스의 구현에 대한 정보자체도 상당히 차단되어버리기 때문에, 실제로 구현체를 찾는 것만해도 상당히 어려울 때가 많습니다.



 # DI Container?

지금까지 간단히 DI에 대해서 알아보았습니다. 그렇다면, DI container란 개념에 대해 생각해보도록 합시다.

DI container는 
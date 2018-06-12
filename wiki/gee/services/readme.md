# Services
[_Swiv Map services - Insite_](../../../) > [_Wiki_](../../) > [_Google Enhanced Ecommerce_](../)

- [Google Enhanced Ecommerce](../)
    - Services
        - [MapperService](mapper.md)
    - [Mappers](../mappers)
        - [Product mapper](../mappers/product.md)
        - [Promotion mapper](../mappers/promotion.md)
        - [Action Field mapper](../mappers/action-field.md)

The main module singleton is the MapperService. It handles all the mapping tasks within Google Enhanced Ecommerce events scopes.
It will be called by Swiv when a Google Enhanced Ecommerce event is triggered.
The service itself is only a manager: it calls the appropriate mapper depending of the event.

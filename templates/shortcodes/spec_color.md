{# Put little emotes by the specs for each laptop on `laptops.md` #}
{% if c == "g" %}
    {% set background_color = "var(--md-sys-color-primary)" %}
    {% set color = "var(--md-sys-color-on-primary)" %}
{% elif c == "y" %}
    {% set background_color = "var(--md-custom-color-warn)" %}
    {% set color = "var(--md-custom-color-on-warn)" %}
{% else %} {# red #}
    {% set background_color = "var(--md-sys-color-error)" %}
    {% set color = "var(--md-sys-color-on-error)" %}
{% endif %}
<span><style>.spec-{{nth}} { background-color: {{background_color|markdown(inline=true)}}; color: {{color|markdown(inline=true)}};}</style><b class="spec-{{nth}}">{{text|safe|markdown(inline=true)}}</b></span>
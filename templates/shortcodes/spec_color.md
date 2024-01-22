{# Put little emotes by the specs for each laptop on `laptops.md` #}
{% if c == "g" %} {# green #}
    {% set background_color = "var(--md-sys-color-primary)" %}
    {% set color = "var(--md-sys-color-on-primary)" %}
    {% set icon = "fa-solid fa-circle-check" %}
{% elif c == "y" %} {# yellow #}
    {% set background_color = "var(--md-custom-color-warn)" %}
    {% set color = "var(--md-custom-color-on-warn)" %}
    {% set icon = "fa-solid fa-circle-exclamation" %}
{% else %} {# red #}
    {% set background_color = "var(--md-sys-color-error)" %}
    {% set color = "var(--md-sys-color-on-error)" %}
    {% set icon = "fa-solid fa-circle-xmark" %}
{% endif %}
<span><style>.spec-{{nth}} { background-color: {{background_color}}; color: {{color}}; padding: 1pt 2pt;} .spec-icon-{{nth}} {color: {{background_color}}; padding-right: 3pt;}</style><i class="spec-icon-{{nth}} {{icon}}"></i><i><b class="spec-{{nth}}">{{text|safe}}</b></i></span>
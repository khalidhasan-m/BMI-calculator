# BMI Calculator Design Directions

## Approach 1 — Vital Atelier

**Theme Name:** Vital Atelier

**Very Brief Intro:** A warm editorial wellness tool that feels like a considered personal health journal, rather than a medical form. It uses restrained color and an asymmetrical composition to make the calculation feel calm and approachable.

**Probability:** 0.07

## Approach 2 — Clinical Signal

**Theme Name:** Clinical Signal

**Very Brief Intro:** A crisp data-forward interface modeled after contemporary diagnostic instruments. Clear visual encoding and precision-first typography would make the calculator feel clinical and efficient.

**Probability:** 0.04

## Approach 3 — Motion Almanac

**Theme Name:** Motion Almanac

**Very Brief Intro:** An optimistic activity companion inspired by sports almanacs and field notes. Large graphic numbers and playful annotations would create an energetic, active experience.

**Probability:** 0.09

---

# Selected Direction — Vital Atelier

## Design Movement

**Warm editorial wellness** informed by independent health journals, a sunlit paper atelier, and simple anatomical-data visualizations. The interface should make a routine calculation feel private, grounded, and encouraging without over-medicalizing the result.

## Core Principles

1. **Human data:** Pair exact values with gentle, understandable interpretation rather than clinical severity.
2. **Structured asymmetry:** Use a left-hand information rail and an offset calculator surface to avoid a generic centered tool layout.
3. **Tactile restraint:** Create depth with soft paper tones, subtle shadows, fine rules, and carefully chosen rounded forms instead of glass effects.
4. **Useful at a glance:** Treat each metric, unit choice, and BMI range as immediately legible and keyboard-accessible.

## Color Philosophy

The experience begins on an oat-paper background that suggests ease and reflection. **Verdant Green** carries the signature action and signals balance, while terracotta provides a warm, human counterpoint. Status hues appear only in the BMI result and range band, so the user's outcome becomes the visual focus without feeling alarming.

## Layout Paradigm

The main screen is a **split editorial spread**: a narrow narrative and category rail on the left, paired with a larger calculator ledger on the right. The calculator surface contains a result column above a form column on wider screens, then stacks into a naturally scrolling single column on mobile.

## Signature Elements

1. A segmented **BMI range ribbon** with a moving needle that maps the calculated value against the four standard adult categories.
2. A small **sunburst measure mark** used in the brand, section labels, and calculation feedback.
3. Soft **paper grain and fine copper rules** that give surfaces quiet material character.

## Interaction Philosophy

Interactions should feel practical and unhurried. Unit selections clearly lock into place, input focus presents a precise outline, the calculation button gives a firm pressed response, and the completed result appears as a brief upward reveal. Reset returns the calculator to its calm initial state.

## Animation

Use a 180–260ms custom ease-out for controls and result reveals. On calculation, the result panel fades and rises from 8px, the numeric result eases into place, and the range needle translates along the ribbon. No looping decorative motion. Respect `prefers-reduced-motion` by removing all nonessential transforms and transitions.

## Typography System

**DM Serif Display** supplies the warm, expressive editorial voice for the main headline and BMI value. **Manrope** carries body copy, labels, and form controls for its clear, compact forms. Headings are high contrast and generously sized; labels use compact uppercase tracking; data values use tabular figures where useful.

## Brand Essence

**A private, beautifully clear health measure for people who want context—not judgment.**

Personality: **grounded, considerate, lucid.**

## Brand Voice

Headlines sound like a measured invitation, CTAs sound direct and purposeful, and supporting copy quietly clarifies limits.

Example lines:

> Find your number. Keep the context.

> Calculate my BMI

Generic filler such as “Welcome to our website” and “Get started today” is not used.

## Wordmark & Logo

The logo is an abstract **radiating measurement mark**: four offset arcs around a centered dot, suggesting both a body’s outline and a reading on an instrument. The wordmark uses a custom letterspaced Manrope treatment with a small serif accent in the final character.

## Signature Brand Color

**Verdant Green — #315D4D.**

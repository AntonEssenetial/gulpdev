# AGENTS.md — Migration to Astro + Vite + Tailwind/PostCSS

## Goal
Полная миграция legacy gulp проекта в новый стек:
- Astro (static output)
- Vite (идёт внутри Astro)
- Tailwind + PostCSS
Без сохранения старых технологий (Gulp/Pug/Stylus).

## Source of truth
- Любые выводы — только по фактам из репозитория и результатам команд.
- В отчётах всегда указывать пути файлов.

## Operating mode (no water)
Формат: Что → Почему → Где → Как исправить → Эффект.
Никаких общих советов без конкретных файлов/диффов.

## Deliverables
- docs/repo-map.md (legacy карта)
- docs/migration/00-plan.md
- docs/migration/10-structure.md (новая структура)
- docs/migration/20-components-map.md (какие legacy modules → какие Astro components)
- docs/migration/30-pages-map.md (какие страницы перенесены)
- docs/migration/40-assets-icons.md (как переносим icons/sprite)
- apps/web/ (готовый новый проект)
- CI (минимум: lint + build)

## Commands to use
Использовать pnpm, если возможно. Все команды документировать в docs.
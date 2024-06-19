@echo off

if "%1"=="" (
    echo Usage: %0 [services...]
    echo Example: %0 mongo postgres
    echo Example: %0 down mongo postgres
    exit /b 1
)

set ACTION=%1
shift

if "%1"=="" (
    echo Please specify the services to manage.
    exit /b 1
)

set SERVICES=
:loop
if "%1"=="" goto end
set SERVICES=%SERVICES% %1
shift
goto loop

:end

set OPTIONS=
if "%ACTION%"=="up" set OPTIONS=-d

echo Running Docker Compose %ACTION% with services:%SERVICES%
call docker-compose -f "%DBService%\docker-compose.yml" %ACTION% %OPTIONS% %SERVICES%

if %ERRORLEVEL% equ 0 (
    echo Docker Compose %ACTION% successfully.
) else (
    echo Docker Compose failed to %ACTION%.
    exit /b %ERRORLEVEL%
)
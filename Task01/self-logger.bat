@echo off
chcp 65001 >nul
setlocal

:: Путь к SQLite
set SQLITE=C:\sqlite\sqlite3.exe
set DB=self_logger.db
set USER=%USERNAME%

:: Дата и время
for /f "tokens=1-3 delims=." %%a in ('echo %date%') do set DATE=%%a.%%b.%%c
for /f "tokens=1-2 delims=: " %%a in ('echo %time%') do set TIME=%%a:%%b
set DATETIME=%DATE% %TIME%

:: Создаём таблицу, если нет
if not exist %DB% (
    "%SQLITE%" %DB% "CREATE TABLE logs(user TEXT, run_date TEXT);"
)

:: Добавляем запись о запуске
"%SQLITE%" %DB% "INSERT INTO logs(user, run_date) VALUES('%USER%', '%DATETIME%');"

:: Получаем статистику
for /f %%a in ('%SQLITE% %DB% "SELECT COUNT(*) FROM logs;"') do set COUNT=%%a
for /f %%a in ('%SQLITE% %DB% "SELECT run_date FROM logs ORDER BY run_date ASC LIMIT 1;"') do set FIRST_RUN=%%a

:: Выводим на экран
echo Имя программы: self-logger.bat
echo Количество запусков: %COUNT%
echo Первый запуск: %FIRST_RUN%
echo ---------------------------------------------
echo User      ^| Date
echo ---------------------------------------------
"%SQLITE%" -header -column %DB% "SELECT user, run_date FROM logs;"

endlocal

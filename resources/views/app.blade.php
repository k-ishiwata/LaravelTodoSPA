<!doctype html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>LaravelTodoSPA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="{{ mix('/css/element-ui.css') }}" rel="stylesheet">
    <link href="{{ mix('/css/app.css') }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<div id="app">
   <app></app>
</div>

<script src="{{ mix('/js/app.js') }}"></script>
</body>
</html>
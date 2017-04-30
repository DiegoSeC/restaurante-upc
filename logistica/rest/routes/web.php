<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

$app->get('/cotizaciones', ['middleware' => 'cors', 'uses' => 'CotizacionController@getCotizaciones']);
$app->get('/cotizacion/{id}', ['middleware' => 'cors', 'uses' => 'CotizacionController@getCotizacion']);
$app->get('/solicitudes', ['middleware' => 'cors', 'uses' => 'SolicitudController@getSolicitudes']);
$app->options('/cotizacion', ['middleware' => 'cors', 'uses' => 'CotizacionController@create']);
$app->post('/cotizacion', ['middleware' => 'cors', 'uses' => 'CotizacionController@create']);
$app->options('/cotizacion/{id}', ['middleware' => 'cors', 'uses' => 'CotizacionController@update']);
$app->put('/cotizacion/{id}', ['middleware' => 'cors', 'uses' => 'CotizacionController@update']);

$app->get('/ordenes', ['middleware' => 'cors', 'uses' => 'OrdenCompraController@getOrdenes']);
$app->get('/ordenes/cotizaciones', ['middleware' => 'cors', 'uses' => 'OrdenCompraController@getCotizaciones']);
$app->options('/orden', ['middleware' => 'cors', 'uses' => 'OrdenCompraController@createOrden']);
$app->post('/orden', ['middleware' => 'cors', 'uses' => 'OrdenCompraController@createOrden']);
$app->get('/orden/{id}', ['middleware' => 'cors', 'uses' => 'OrdenCompraController@getOrden']);
$app->options('/orden/{id}', ['middleware' => 'cors', 'uses' => 'OrdenCompraController@update']);
$app->put('/orden/{id}', ['middleware' => 'cors', 'uses' => 'OrdenCompraController@update']);
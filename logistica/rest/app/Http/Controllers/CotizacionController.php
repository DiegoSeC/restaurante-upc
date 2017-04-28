<?php

namespace App\Http\Controllers;


use App\Services\BL_Cotizacion;
use Illuminate\Http\Request;

class CotizacionController extends Controller
{
    private $blCotizacion;

    public function __construct(BL_Cotizacion $blCotizacion)
    {
        $this->blCotizacion = $blCotizacion;
    }

    public function getCotizaciones(Request $input)
    {
        $cotizaciones = $this->blCotizacion->getCotizaciones($input->get('q', null));
        return response()->json($cotizaciones);
    }
}
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

    public function getCotizacion($id)
    {
        $cotizacion = $this->blCotizacion->getCotizacion($id);
        return response()->json($cotizacion);
    }

    public function create(Request $input)
    {
        $cotizacion = $this->blCotizacion->createCotizacion($input->json());
        return response()->json($cotizacion);
    }

    public function update($id, Request $input)
    {
        $cotizacion = $this->blCotizacion->updateCotizacion($id, $input->json());
        return response()->json($cotizacion);
    }
}
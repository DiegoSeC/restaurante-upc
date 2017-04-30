<?php

namespace App\Http\Controllers;

use App\Services\BL_OrdenCompra;
use Illuminate\Http\Request;

class OrdenCompraController extends Controller
{
    private $blOrdenCompra;

    function __construct(BL_OrdenCompra $ordenCompra)
    {
        $this->blOrdenCompra = $ordenCompra;
    }

    public function getOrdenes(Request $input)
    {
        $ordenes = $this->blOrdenCompra->getOrdenes($input->get('q', null));
        return response()->json($ordenes);
    }

    public function getCotizaciones(Request $input)
    {
        $cotizaciones = $this->blOrdenCompra->getCotizaciones($input->get('q', 0));
        return response()->json($cotizaciones);
    }

    public function createOrden(Request $input)
    {
        $orden = $this->blOrdenCompra->createOrden($input->json());
        return response()->json($orden);
    }

    public function getOrden($id)
    {
        $orden = $this->blOrdenCompra->getOrden($id);
        return response()->json($orden);
    }

    public function update($id, Request $input)
    {
        $orden = $this->blOrdenCompra->updateOrden($id, $input->json());
        return response()->json($orden);
    }
}
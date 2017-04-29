<?php
/**
 * Created by PhpStorm.
 * User: diegosec
 * Date: 28/04/17
 * Time: 20:34
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BL_SolicitudCotizacion;

class SolicitudController extends Controller
{
    private $blSolicitudCotizacion;

    function __construct(BL_SolicitudCotizacion $blSolicitudCotizacion)
    {
        $this->blSolicitudCotizacion = $blSolicitudCotizacion;
    }

    public function getSolicitudes(Request $input)
    {
        $solicitudes = $this->blSolicitudCotizacion->getSolicitudes($input->get('q', null));
        return response()->json($solicitudes);
    }

}
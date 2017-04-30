<?php

namespace App\Services;

use App\Repositories\DAO_DetalleSolicitudCotizacion;
use App\Repositories\DAO_SolicitudCotizacion;
use App\Repositories\Repository;

class BL_SolicitudCotizacion extends Repository
{
    private $repository;
    private $detalleRepository;

    public function __construct(DAO_SolicitudCotizacion $dao,
                                DAO_DetalleSolicitudCotizacion $detalleSolicitudCotizacion)
    {
        $this->repository = $dao;
        $this->detalleRepository = $detalleSolicitudCotizacion;
    }

    public function getSolicitudes($q = null)
    {
        if(isset($q)) {
            $solicitudes = $this->repository->getLikeAll($q);
        } else {
            $solicitudes = $this->repository->getAll();
        }

        return $this->attachDetalle($solicitudes);
    }

    public function updateEstado($id)
    {
        return $this->repository->updateEstado($id);
    }

    private function attachDetalle($solicitudes)
    {
        foreach ($solicitudes as $solicitud)
        {
            $solicitud->productos = $this->detalleRepository->findBySolicitud($solicitud->numero);
        }

        return $solicitudes;
    }

}
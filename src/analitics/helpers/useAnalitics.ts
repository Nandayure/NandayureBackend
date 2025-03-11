import { RequestTypeRepository } from 'src/request-types/repository/request-types.repository';
import { RequestStateRepository } from 'src/requests-state/repository/request-state.repository';

export function useAnalitics(
  requestStateRepository: RequestStateRepository,
  requestTypeRepository: RequestTypeRepository,
) {
  async function mapRequestType(data: any[], typeId: number, total: number) {
    const entry = data.find((d) => d.typeId === typeId);

    const requestType = entry
      ? entry.name
      : ((
          await requestTypeRepository.findOne({
            select: ['name'],
            where: { id: typeId },
          })
        )?.name ?? 'Unknown');

    return {
      name: requestType,
      total: entry ? parseInt(entry.total, 10) : 0,
      percentage: entry ? (parseInt(entry.total, 10) / total) * 100 : 0,
    };
  }

  async function mapRequestStatus(data: any[], statusId: number) {
    const entry = data.find((d) => d.statusId === statusId);

    const requestStatus = entry
      ? entry.name
      : ((
          await requestStateRepository.findOne({
            select: ['Name'],
            where: { id: statusId },
          })
        ).Name ?? 'Unknown');

    const result = {
      status: requestStatus,
      total: entry ? parseInt(entry.total, 10) : 0,
    };
    return result;
  }

  return {
    mapRequestType,
    mapRequestStatus,
  };
}

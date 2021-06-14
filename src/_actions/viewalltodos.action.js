import { viewalltodosConstants } from '../_constants';
import { viewallTodosService } from '../_services';
import { alertActions } from '.';
export const viewAllTodosActions = {
    getTodos,
    resetAllTodos
};

function getTodos(pageNum, pageSize) {
    return dispatch => {
        console.log('getTodos')
        dispatch(request(pageNum, pageSize));

        return viewallTodosService.getTodos(pageNum, pageSize)
            .then(
                todoinstances => {
                    console.log(todoinstances);
                    dispatch(success(todoinstances));
                    dispatch(alertActions.clear());
                },
                error => {
                    console.log(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )

    };

    function request() { return { type: viewalltodosConstants.GET_ALL_TODOS, pageNum, pageSize} }
    function success(todoinstances) { return { type: viewalltodosConstants.GET_ALL_TODOS_SUCCESS, todoinstances } }
    function failure(error) { return { type: viewalltodosConstants.GET_ALL_TODOS_FAILURE, error } }
}

function resetAllTodos() {
    return dispatch => {
        console.log('resetAllTodos dispatched')
        dispatch(request());
        dispatch(success());
        dispatch(alertActions.clear());
    }
    function request() { return { type: viewalltodosConstants.RESET_ALL_TODOS } }
    function success() { return { type: viewalltodosConstants.RESET_ALL_TODOS_SUCCESS } }
}
